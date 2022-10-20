import { createContext, ReactNode, useContext, useState } from 'react'
import Router from 'next/router'

import { APIClient } from 'services/api'
import { destroyCookie, parseCookies } from 'nookies'
import { cookiesNames } from 'constants/cookies'

import { IAuthContextData, ICreadentialsProps, IUserProps } from './types'

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<IUserProps>(() => {
    const cookies = parseCookies()

    if (cookies[cookiesNames.user]) {
      return JSON.parse(cookies[cookiesNames.user])
    }

    return {} as IUserProps
  })

  async function signIn({ email, password }: ICreadentialsProps) {
    APIClient()
      .post<IUserProps>('/user/login', { email, password })
      .then((response) => {
        setUser(response.data)
      })

    console.log({ email, password })
    console.log('logged')
  }

  function signOut() {
    destroyCookie(undefined, cookiesNames.refreshToken)
    destroyCookie(undefined, cookiesNames.token)

    Router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export default AuthContext
