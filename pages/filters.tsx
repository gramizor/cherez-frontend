import FiltersPageWrapper from '@/src/components/wrappers/FiltersPageWrapper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Filters() {
  return <FiltersPageWrapper />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'categories', 'forms', 'countries'])),
    },
  }
}
