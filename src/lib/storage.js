import jwt_decode from 'jwt-decode'

const getSavedAds = async value => {
  try {
    let savedAds = JSON.parse(localStorage.getItem('SAVED_ADS')) || []
    if (savedAds.includes(value)) {
      let index = savedAds.indexOf(value)
      if (index !== -1) {
        savedAds.splice(index, 1)
      }
    } else {
      savedAds.push(value)
    }
    await localStorage.setItem('SAVED_ADS', JSON.stringify(savedAds))
  } catch (error) {
    console.log('AsyncStorage.setItem error: ', error)
  }
}

const setSavedAds = () => {
  let savedAds = []

  try {
    savedAds = localStorage.getItem('SAVED_ADS')
  } catch (error) {
    console.log('AsyncStorage.setItem error: ', error)
  }

  return savedAds
}

const getJWTBearerToken = async value => {
  try {
    await localStorage.setItem('SESSION_TOKEN', value)
  } catch (error) {
    console.log('AsyncStorage.setItem error: ', error)
  }
}

const setJWTBearerToken = async () => {
  let token = ''

  try {
    token = await localStorage.getItem('SESSION_TOKEN')
  } catch (error) {
    console.log('AsyncStorage.setItem error: ', error)
  }

  return token
}

const removeJWTBearerToken = async () => {
  try {
    await localStorage.removeItem('SESSION_TOKEN')
  } catch (error) {
    console.log('AsyncStorage.removeItem error: ', error)
  }
}

const decodeJWTBearerToken = async () => {
  try {
    const token = await localStorage.getItem('SESSION_TOKEN')
    if (token) return jwt_decode(token)
  } catch (error) {
    console.log('AsyncStorage.removeItem error: ', error)
  }
}

const setLocale = async locale => {
  try {
    await localStorage.setItem('LOCALE', locale)
  } catch (error) {
    console.log('AsyncStorage.setItem error: ', error)
  }
}

const getLocale = async () => {
  try {
    return (await localStorage.getItem('LOCALE')) || 'ru-RU'
  } catch (error) {
    console.log('AsyncStorage.getItem error: ', error)
    return 'ru-RU'
  }
}

export {
  getJWTBearerToken,
  setJWTBearerToken,
  removeJWTBearerToken,
  decodeJWTBearerToken,
  getSavedAds,
  setSavedAds,
  setLocale,
  getLocale,
}
