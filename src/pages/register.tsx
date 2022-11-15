import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { FormEvent, useState } from 'react'
import NextLink from 'next/link'
import type { NextPage } from 'next'

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

import { useRegisterValidation } from 'hooks/Validation'
import { useAuth } from 'hooks/useAuth'

const Register: NextPage = () => {
  const validate = useRegisterValidation()
  const { signup } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegisterSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    const error = await validate({ name, lastName, email, password })

    if (error.length > 0) {
      toast.error(error[0], {
        position: 'top-center'
      })

      setIsLoading(false)
      return
    }

    signup({ name, lastName, email, password }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword((oldValue) => !oldValue)
  }

  return (
    <AuthenticationLayout>
      <header>
        <NextLink href="/login">
          <a>
            <FiArrowLeft />
            Voltar para login
          </a>
        </NextLink>
        <Typography component="h1" variant="h3">
          Cadastro
        </Typography>
      </header>
      <Box component="form" autoComplete="on" className="form" onSubmit={handleRegisterSubmit}>
        <TextField
          id="name"
          type="text"
          name="name"
          placeholder="João"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Nome"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Silva"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          label="Sobrenome"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          id="email"
          type="email"
          name="email"
          autoComplete="email"
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
            {isLoading ? <CircularProgress color="success" /> : 'Cadastrar-se'}
          </Button>
          <NextLink href="/login">
            <Link underline="none">Já tem uma conta?</Link>
          </NextLink>
        </Box>
      </Box>
    </AuthenticationLayout>
  )
}

export default Register
