import { useEffect, useState } from 'react'

import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'

import AppProvider from 'hooks'

import { ThemeProvider } from 'styled-components'

import { theme } from 'styles/themes/default'

function MyApp({ Component, pageProps }: AppProps) {
  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    setIsAppLoading(false)
  }, [])

  return (
    <>
      {isAppLoading ? (
        ''
      ) : (
        <ThemeProvider theme={theme}>
          <AppProvider>
            <Component {...pageProps} />
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      )}
    </>
  )
}

export default MyApp
