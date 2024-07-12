import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PromotionPageWrapper from '@/src/components/wrappers/PromotionPageWrapper'

export default function Promotion() {
  return <PromotionPageWrapper content={'Raise'} />
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'promotion'])),
    },
  }
}
