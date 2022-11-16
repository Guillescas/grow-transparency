import { FormEvent, useState } from 'react'

import toast from 'react-hot-toast'
import { ErrorApiResponse } from 'interfaces/api'
import { AxiosError } from 'axios'
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import BaseModal from '../@BaseModal'

import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { ICreateProjectModalProps } from './types'

import { theme } from 'styles/themes/default'
import * as Styles from './styles'

export function CreateProjectModal(props: ICreateProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [totalTime, setTotalTime] = useState('')
  const [status, setStatus] = useState('')
  const [score, setScore] = useState('')
  const [link, setLink] = useState('')

  function handleCreateProject(event: FormEvent) {
    event.preventDefault()

    setIsLoading(true)

    const project = {
      name,
      description,
      cost,
      totalTime,
      status,
      score,
      link
    }

    APIClient()
      .post('/project', project)
      .then(() => {
        props.setNewProject(project)

        toast.success('Projeto criado com sucesso')
        props.handleCloseModal()
      })
      .catch((error: AxiosError<ErrorApiResponse>) => {
        toast.error(error.response?.data.message || 'Erro inesperado')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <BaseModal
      handleCloseModal={props.handleCloseModal}
      isModalOpen={props.isModalOpen}
      title="Criar novo projeto"
    >
      <Styles.CreateProjectModalContainer onSubmit={handleCreateProject}>
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
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          label="Descrição"
          variant="outlined"
          size="small"
          fullWidth
          required
        />

        <FormControl fullWidth>
          <InputLabel htmlFor="cost">Amount</InputLabel>
          <OutlinedInput
            id="cost"
            type="number"
            name="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            label="Custo"
            size="small"
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            required
          />
        </FormControl>

        <TextField
          id="totalTime"
          type="number"
          name="totalTime"
          value={totalTime}
          onChange={(event) => setTotalTime(event.target.value)}
          label="Tempo total do projeto (em horas)"
          variant="outlined"
          size="small"
          fullWidth
          required
        />

        <TextField
          id="status"
          type="number"
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          label="Status"
          variant="outlined"
          size="small"
          fullWidth
          required
        />

        <TextField
          id="score"
          type="number"
          name="score"
          value={score}
          onChange={(event) => setScore(event.target.value)}
          label="Pontuação"
          variant="outlined"
          size="small"
          fullWidth
          required
        />

        <TextField
          id="link"
          type="text"
          name="link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          label="Link"
          variant="outlined"
          placeholder="https://linkdoprojeto.com"
          size="small"
          fullWidth
          required
        />

        <Button type="submit" variant="contained" size="medium" disabled={isLoading} fullWidth>
          {isLoading ? (
            <Loading color={theme.colors.black} width={20} height={20} />
          ) : (
            'Criar Projeto'
          )}
        </Button>
      </Styles.CreateProjectModalContainer>
    </BaseModal>
  )
}
