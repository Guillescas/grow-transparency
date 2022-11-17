import { FormEvent, useState } from 'react'

import toast from 'react-hot-toast'
import { ErrorApiResponse } from 'interfaces/api'
import { AxiosError } from 'axios'
import { Button, TextField } from '@mui/material'
import BaseModal from '../@BaseModal'

import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { IUserModalProps } from './types'

import { theme } from 'styles/themes/default'
import * as Styles from './styles'

export function UserModal(props: IUserModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsLoading(true)

    handleCreateUser()
  }

  function handleCreateUser() {
    const splittedName = name.split(' ')
    console.log(splittedName[splittedName.length - 1])

    const user = {
      name,
      lastName: splittedName[splittedName.length - 1],
      email,
      password
    }

    APIClient()
      .post('/user/register', user)
      .then((response) => {
        props.setNewUser(response.data)

        toast.success('Projeto criado com sucesso')
        props.handleCloseModal()
      })
      .catch((error: AxiosError<ErrorApiResponse[]>) => {
        console.log(error)
        toast.error(error.response?.data[0].message || 'Erro inesperado')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <BaseModal
      handleCloseModal={props.handleCloseModal}
      isModalOpen={props.isModalOpen}
      title="Criar novo usuário"
    >
      <Styles.UserModalContainer onSubmit={handleSubmit}>
        <TextField
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Nome"
          variant="outlined"
          size="small"
          fullWidth
          required
        />

        <TextField
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="E-mail"
          variant="outlined"
          size="small"
          type="email"
          fullWidth
          required
        />

        <TextField
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          label="Senha"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          required
        />

        <Button type="submit" variant="contained" size="medium" disabled={isLoading} fullWidth>
          {isLoading ? (
            <Loading color={theme.colors.black} width={20} height={20} />
          ) : (
            'Criar usuário'
          )}
        </Button>
      </Styles.UserModalContainer>
    </BaseModal>
  )
}
