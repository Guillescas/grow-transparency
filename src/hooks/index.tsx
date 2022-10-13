import { AuthProvider } from 'hooks/useAuth'

import { GlobalStyles } from 'styles/globals'

import { IAppProviderProps } from './types'

function AppProvider(props: IAppProviderProps) {
  return (
    <AuthProvider>
      <GlobalStyles />

      {props.children}
    </AuthProvider>
  )
}

export default AppProvider
