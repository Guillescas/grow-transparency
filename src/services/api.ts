import { GetServerSidePropsContext } from 'next'

import { parseCookies } from 'nookies'
import { cookiesNames } from 'constants/cookies'
import axios, { AxiosInstance } from 'axios'

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

  return api
}
