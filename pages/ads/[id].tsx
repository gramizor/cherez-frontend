import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ShowAdsPageWrapper from '@/src/components/wrappers/ShowAdsPageWrapper'

export default function ShowAds() {
  return <ShowAdsPageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forms', 'countries', 'categories', 'ad'])),
    },
  }
}
