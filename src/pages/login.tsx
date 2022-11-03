import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FormEvent, useState } from 'react'
import NextLink from 'next/link'
import type { NextPage } from 'next'

import { LoginLayout } from 'layout/LoginLayout'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material'

import { useLoginValidation } from 'hooks/Validation/useLoginValidation'

const Login: NextPage = () => {
  const validate = useLoginValidation()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLoginSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    const error = await validate({ email, password })
    if (error.length > 0) {
      console.log(error)
      return
    }
    console.log('Email: ', email)
    console.log('Password: ', password)
  }

  const handleClickShowPassword = () => {
    setShowPassword((oldValue) => !oldValue)
  }

  return (
    <LoginLayout>
      <header>
        <Typography component="h1" variant="h3">
          Login
        </Typography>
      </header>
      <Box component="form" autoComplete="on" className="form" onSubmit={handleLoginSubmit}>
        <TextField
          id="email"
          type="email"
          name="email"
          placeholder="example@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="coloque sua senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          label="Senha"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="muda visibilidade da senha"
                  edge="end"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          fullWidth
          required
        />
        <Box component="footer" className="form-footer">
          <Button type="submit" variant="contained" disabled={isLoading} fullWidth>
            {isLoading ? <CircularProgress color="success" /> : 'Login'}
          </Button>
          <NextLink href="/register">
            <Link underline="none">Não tem uma conta? Cadastre-se</Link>
          </NextLink>
        </Box>
      </Box>
    </LoginLayout>
  )
}

export default Login
