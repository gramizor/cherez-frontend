import {
  CreateProProfile,
  DeleteCompanyProfile,
  FindPro,
  GetCompanyProfile,
  SaveProProfile,
} from '@/src/types/redux/pro'
import { axiosClient } from 'src/lib/axios'

const getCompanyProfile = (payload: GetCompanyProfile) => {
  const { companyProfileId } = payload
  const path = 'functions/getCompanyProfile'
  return axiosClient.post(path, { companyProfileId })
}

const findCompanyProfiles = (payload: FindPro) => {
  const { ownerId, category } = payload
  const path = 'functions/findCompanyProfiles'
  return axiosClient.post(path, { ownerId, category })
}

const getMyCompanyProfiles = () => {
  const path = 'functions/getMyCompanyProfiles'
  return axiosClient.post(path)
}

const getMyCompanyProfileImagesLimit = () => {
  const path = 'functions/getMyCompanyProfileImagesLimit'
  return axiosClient.post(path)
}

const getCompanyProfileAdsCount = () => {
  const path = 'functions/getCompanyProfileAdsCount'
  return axiosClient.post(path)
}

const deleteCompanyProfile = (payload: DeleteCompanyProfile) => {
  const { profileId } = payload
  const path = 'functions/deleteCompanyProfile'
  return axiosClient.post(path, { profileId })
}

const createCompanyProfile = (payload: CreateProProfile) => {
  const { tariffMonths, category, paymentMethods } = payload
  const path = 'functions/createCompanyProfile'
  return axiosClient.post(path, { tariffMonths, category, paymentMethods })
}

const saveCompanyProfile = (payload: SaveProProfile) => {
  const {
    companyProfileId,
    companyName,
    companyDescription,
    companyDescription2,
    contactPersonName,
    companyLogo,
    companyBanner,
    companyImages,
    isPublic,
  } = payload
  const path = 'functions/saveCompanyProfile'
  return axiosClient.post(path, {
    companyProfileId,
    companyName,
    companyDescription,
    companyDescription2,
    contactPersonName,
    companyLogo,
    companyBanner,
    companyImages,
    isPublic,
  })
}
export {
  getCompanyProfile,
  findCompanyProfiles,
  getMyCompanyProfiles,
  getMyCompanyProfileImagesLimit,
  getCompanyProfileAdsCount,
  deleteCompanyProfile,
  createCompanyProfile,
  saveCompanyProfile,
}
