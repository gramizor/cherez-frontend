import i18n from 'i18next'

export const translate = (key: string, options?: any) => {
  return i18n.t(key, options)
}
