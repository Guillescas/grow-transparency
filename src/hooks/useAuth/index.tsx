import { createContext, ReactNode, useContext, useState } from 'react'

import toast from 'react-hot-toast'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from 'next/router'
import { ErrorApiResponse } from 'interfaces/api'
import { cookiesNames } from 'constants/cookies'
import { AxiosError } from 'axios'

import { APIClient } from 'services/api'

import { IAuthContextData, ICreadentialsProps, IUserProps, IUserSignUpProps } from './types'

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<IUserProps>(() => {
    const cookies = parseCookies()

    if (cookies[cookiesNames.user]) {
      return JSON.parse(cookies[cookiesNames.user])
    }

    return {} as IUserProps
  })

  async function signup(data: IUserSignUpProps) {
    APIClient()
      .post('/user/register', data)
      .then((response) => {
        setCookie(undefined, cookiesNames.token, response.data.token)

        Router.push('/login')
      })
      .catch((error: AxiosError<ErrorApiResponse>) => {
        toast.error(error.response?.data.message || 'Erro inesperado', {
          position: 'top-center'
        })
      })
  }

  async function signIn({ email, password }: ICreadentialsProps) {
    APIClient()
      .post('/user/login', { email, password })
      .then((response) => {
        setCookie(undefined, cookiesNames.token, response.data.token)

        Router.push('/')
      })
  }

  function signOut() {
    destroyCookie(undefined, cookiesNames.refreshToken)
    destroyCookie(undefined, cookiesNames.token)

    Router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        signup,
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
