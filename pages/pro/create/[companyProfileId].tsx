import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PromotionPageWrapper from '@/src/components/wrappers/PromotionPageWrapper'
import CreateCategory from '@/src/components/wrappers/CategoryPageWrapper/CreateCategory'

export default function Promotion() {
  return <CreateCategory />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'promotion', 'categories', 'forms'])),
    },
  }
}
