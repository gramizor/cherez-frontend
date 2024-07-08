import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ShowAccountPageWrapper from '@/src/components/wrappers/ShowAccountPageWrapper'

export default function ShowAccount() {
  return <ShowAccountPageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'ad', 'account'])),
    },
  }
}
