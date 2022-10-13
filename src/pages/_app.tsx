import type { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'

import AppProvider from 'hooks'

import { theme } from 'styles/themes/default'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  )
}

export default MyApp
