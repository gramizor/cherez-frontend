import HomePageWrapper from '@/src/components/wrappers/HomePageWrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  return <HomePageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forms', 'countries', 'categories'])),
    },
  }
}
