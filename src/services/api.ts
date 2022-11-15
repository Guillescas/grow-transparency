import { GetServerSidePropsContext } from 'next'

import toast from 'react-hot-toast'
import { destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { ErrorApiResponse } from 'interfaces/api'
import { cookiesNames } from 'constants/cookies'
import axios, { AxiosError, AxiosInstance } from 'axios'

import { AuthTokenErrorInvalid } from './errors/AuthTokenErrorInvalid'

export function APIClient(ctx?: GetServerSidePropsContext): AxiosInstance {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (cookies[cookiesNames.token]) {
    api.defaults.headers.common.Authorization = `Bearer ${cookies[cookiesNames.token]}`
  }

  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error: AxiosError<ErrorApiResponse>) => {
      if (!error.response) {
        return Promise.reject(error)
      }

      console.log(error.response.data.message)

      if (error.response.data.message === 'Acesso negado: token expirado') {
        if (error.response.config.url === '/login') {
          return toast.error('Usuário ou senha inválidos')
        }
        destroyCookie(ctx, cookiesNames.token)

        if (typeof window !== undefined) {
          Router.push('/login')
          toast.error('Token inválido. Faça login novamente')
        } else {
          return Promise.reject(new AuthTokenErrorInvalid())
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
