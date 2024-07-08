import '@/styles/globals.css'
import 'leaflet/dist/leaflet.css'
import type { AppProps } from 'next/app'
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'src/theme'
import DefaultLayout from 'src/layouts/DefaultLayout'
import wrapper from 'src/redux/store'
import { compose } from 'redux'
import { appWithTranslation } from 'next-i18next'
import { ReactHotToast } from 'src/components/atoms/ReactHotToast/ReactHotToast'
import { Toaster } from 'react-hot-toast'
import CurrentUserProvider from '@/src/layouts/CurrentUserProvider'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <ThemeProvider theme={theme}>
        <CurrentUserProvider>
          <DefaultLayout>
            <Head>
              <title>Cherez</title>
            </Head>
            <Component {...pageProps} />
          </DefaultLayout>
          <ReactHotToast>
            <Toaster position={'bottom-left'} toastOptions={{ className: 'react-hot-toast' }} />
          </ReactHotToast>
        </CurrentUserProvider>
      </ThemeProvider>
    </AppCacheProvider>
  )
}

export default compose(wrapper.withRedux, appWithTranslation)(App)
