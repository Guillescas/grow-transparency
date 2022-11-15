import { FormEvent, useState } from 'react'
import type { NextPage } from 'next'

import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import toast from 'react-hot-toast'
import NextLink from 'next/link'
import { AuthenticationLayout } from 'layout/AuthenticationLayout'
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
import { useAuth } from 'hooks/useAuth'

const Login: NextPage = () => {
  const validate = useLoginValidation()
  const { signIn } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLoginSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const error = await validate({ email, password })

    if (error.length > 0) {
      toast.error(error[0], {
        position: 'top-center'
      })
      return
    }

    signIn({ email, password }).finally(() => setIsLoading(false))
  }

  const handleClickShowPassword = () => {
    setShowPassword((oldValue) => !oldValue)
  }

  return (
    <AuthenticationLayout>
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
    </AuthenticationLayout>
  )
}

export default Login
