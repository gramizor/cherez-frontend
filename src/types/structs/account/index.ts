export interface MyAccountUpdatePhoneProps {
  phone: string
}

export interface MyAccountUpdateAboutMeProps {
  aboutMe: string
}

export interface MyAccountUpdatePassportInfoProps {
  fullName: string
  birthDate: string
  seriesAndNumber: string
  issueDate: string
  expireDate: string
  country: string
}

export interface MyAccountUpdateProps
  extends MyAccountUpdatePhoneProps,
    MyAccountUpdatePassportInfoProps,
    MyAccountUpdateAboutMeProps {}
