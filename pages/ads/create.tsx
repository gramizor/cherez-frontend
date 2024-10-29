import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CreateAdPageWrapper from '@/src/components/wrappers/CreateAdPageWrapper'

export default function CreateAd() {
  return <CreateAdPageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forms', 'countries', 'categories', 'ad', 'notifications'])),
    },
  }
}
