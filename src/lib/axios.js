import axios from 'axios'

import { endsWith, get } from 'lodash'

// src
import { getJWTBearerToken, removeJWTBearerToken, setJWTBearerToken } from './storage'

const baseURL = process.env.API_SERVER_URL

const headers = {
  Accept: 'application/json',
  'X-Parse-Application-Id': process.env.APP_ID,
}

const axiosClient = axios.create({
  baseURL,
  headers,
})

axiosClient.interceptors.request.use(
  async request => {
    const token = await setJWTBearerToken()
    if (token) {
      request.headers['X-Parse-Session-Token'] = token
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  async response => {
    if (get(response.data, 'sessionToken', false)) {
      await getJWTBearerToken(response.data.sessionToken)
    }
    if (endsWith(response.config.url, 'logout') && response.status === 200) {
      await removeJWTBearerToken()
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export { baseURL, axiosClient }
