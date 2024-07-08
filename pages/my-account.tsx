import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MyAccountPageWrapper from '@/src/components/wrappers/MyAccountPageWrapper'

export default function MyAccount() {
  return <MyAccountPageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'account', 'forms', 'ad'])),
    },
  }
}
