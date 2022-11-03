import { useState } from 'react'
import { NextPage } from 'next'

import { Button, TextField } from '@mui/material'

import { useAuth } from 'hooks/useAuth'

import * as Styles from 'styles/pages/login'

const Login: NextPage = () => {
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {
    signIn({ email, password })
  }

  return (
    <Styles.LoginContainer>
      <form onSubmit={handleLogin}>
        <h1>Grow Transparency</h1>

        <TextField
          id="outlined-basic"
          name="asa"
          label="E-mail"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          name="password"
          type="password"
          label="Senha"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </form>
    </Styles.LoginContainer>
  )
}

export default Login
