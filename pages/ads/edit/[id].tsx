import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import EditAdPageWrapper from '@/src/components/wrappers/EditAdPageWrapper/EditAdPageWrapper'

export default function CreateAd() {
  return <EditAdPageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forms', 'countries', 'categories', 'ad'])),
    },
  }
}
