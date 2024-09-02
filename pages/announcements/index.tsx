import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MyAdsPageWrapper from '@/src/components/wrappers/MyAdsPageWrapper'

export default function Promotion() {
  return <MyAdsPageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'promotion', 'categories'])),
    },
  }
}
