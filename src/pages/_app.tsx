import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'

import AppProvider from 'hooks'

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
