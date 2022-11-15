import type { GetServerSideProps, NextPage } from 'next'

import { parseCookies } from 'nookies'
import { AppLayout } from 'layout/AppLayout'
import { cookiesNames } from 'constants/cookies'

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div>Home</div>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if (!cookies[cookiesNames.token]) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
