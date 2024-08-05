import {
  CreateProProfile,
  DeleteCompanyProfile,
  FindPro,
  GetCompanyProfile,
  SaveProProfile,
} from '@/src/types/redux/pro'
import axios from 'axios'
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

const loadImages = async (
  images: File[],
  companyId: string,
  token: string,
  logo?: File,
  banner?: File
): Promise<{ imageUrls: string[]; logoUrl: string; bannerUrl: string }> => {
  const uploadImage = async (image: File): Promise<string> => {
    try {
      const response = await axios
        .create({
          baseURL: process.env.API_SERVER_URL,
          headers: {
            Accept: 'application/json',
            'X-Parse-Application-Id': process.env.APP_ID,
            'Content-Type': image.type,
            'X-Parse-Session-Token': token,
          },
        })
        .post(`files/${companyId}_companyProfileImage`, image)

      return response.data.url
    } catch (error) {
      console.log('Error uploading image:', error)
      return ''
    }
  }

  const imageUrls: string[] = []
  let logoUrl: string = ''
  let bannerUrl: string = ''

  if (logo) {
    logoUrl = await uploadImage(logo)
  }

  if (banner) {
    bannerUrl = await uploadImage(banner)
  }

  if (images.length > 0) {
    const urls = await Promise.all(images.map(uploadImage))
    imageUrls.push(...urls.filter(url => url))
  }

  return { imageUrls, logoUrl, bannerUrl }
}
const saveCompanyProfile = async (payload: SaveProProfile, token: string) => {
  const { companyProfileId, companyName, companyDescription, companyDescription2, contactPersonName, isPublic } =
    payload

  let logoUrl: string = ''
  let bannerUrl: string = ''
  let imageUrls: string[] = []

  if (typeof payload.companyLogo === 'string') {
    logoUrl = payload.companyLogo
  }

  if (typeof payload.companyBanner === 'string') {
    bannerUrl = payload.companyBanner
  }

  if (Array.isArray(payload.companyImages)) {
    const fileImages = payload.companyImages.filter(image => image instanceof File) as File[]
    imageUrls = payload.companyImages.filter(image => typeof image === 'string') as string[]

    if (fileImages.length > 0) {
      const { imageUrls: loadedImageUrls } = await loadImages(fileImages, companyProfileId, token)
      imageUrls.push(...loadedImageUrls)
    }
  }

  if (companyProfileId && (logoUrl === '' || bannerUrl === '' || imageUrls.length === 0)) {
    const validImages = payload.companyImages.filter(image => image instanceof File || typeof image === 'string')
    const {
      imageUrls: loadedImageUrls,
      logoUrl: loadedLogoUrl,
      bannerUrl: loadedBannerUrl,
    } = await loadImages(
      validImages.filter(image => image instanceof File) as File[],
      companyProfileId,
      token,
      logoUrl === '' ? (payload.companyLogo as File) : undefined,
      bannerUrl === '' ? (payload.companyBanner as File) : undefined
    )

    if (imageUrls.length === 0) {
      imageUrls = loadedImageUrls
    }
    if (logoUrl === '') {
      logoUrl = loadedLogoUrl
    }
    if (bannerUrl === '') {
      bannerUrl = loadedBannerUrl
    }
  }

  const path = 'functions/saveCompanyProfile'
  return axiosClient.post(path, {
    companyProfileId,
    companyName,
    companyDescription,
    companyDescription2,
    contactPersonName,
    companyLogo: logoUrl,
    companyBanner: bannerUrl,
    companyImages: imageUrls,
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
