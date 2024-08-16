const getSingleImage = (images?: string[]): string | undefined => {
  return images && images.length > 0 ? images[0] : undefined
}

export default getSingleImage
