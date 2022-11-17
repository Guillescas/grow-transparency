import { FormEvent, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { ErrorApiResponse } from 'interfaces/api'
import { AxiosError } from 'axios'
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import BaseModal from '../@BaseModal'

import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { IProjectModalProps, IProjectProps, IStatusProps } from './types'

import { theme } from 'styles/themes/default'
import * as Styles from './styles'

export function ProjectModal(props: IProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [statusOptions, setStatusOptions] = useState<IStatusProps[]>([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [totalTime, setTotalTime] = useState('')
  const [status, setStatus] = useState('')
  const [score, setScore] = useState('')
  const [link, setLink] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsLoading(true)

    if (props.projectBeignEdited) {
      handleUpdateProject()

      return
    }

    handleCreateProject()
  }

  function handleCreateProject() {
    const project = {
      name,
      description,
      cost,
      totalTime,
      statusId: Number(status),
      score,
      link
    }

    APIClient()
      .post<IProjectProps>('/project', project)
      .then((response) => {
        props.setNewProject(response.data)

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

  function handleUpdateProject() {
    const updatedProject = {
      name,
      description,
      cost,
      totalTime,
      statusId: Number(status),
      score,
      link
    }

    APIClient()
      .put<IProjectProps>(`/project/${props.projectBeignEdited?.id}`, updatedProject)
      .then((response) => {
        props.setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === props.projectBeignEdited?.id) {
              return response.data
            }

            return project
          })
        })

        toast.success('Projeto atualizado com sucesso')
        props.handleCloseModal()
      })
      .catch((error: AxiosError<ErrorApiResponse>) => {
        toast.error(error.response?.data.message || 'Erro inesperado')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (props.projectBeignEdited) {
      setName(props.projectBeignEdited.name)
      setDescription(props.projectBeignEdited.description)
      setCost(props.projectBeignEdited.cost)
      setTotalTime(props.projectBeignEdited.totalTime)
      setStatus(String(props.projectBeignEdited.status.id))
      setScore(props.projectBeignEdited.score)
      setLink(props.projectBeignEdited.link)
    }
  }, [props.projectBeignEdited])

  useEffect(() => {
    APIClient()
      .get('/status')
      .then((response) => {
        setStatusOptions(response.data)
      })
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  return (
    <BaseModal
      handleCloseModal={props.handleCloseModal}
      isModalOpen={props.isModalOpen}
      title={props.projectBeignEdited ? 'Editar projeto' : 'Criar novo projeto'}
    >
      <Styles.CreateProjectModalContainer onSubmit={handleSubmit}>
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

        <Box style={{ width: '100%' }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Age"
              onChange={handleChange}
              size="small"
              style={{ zIndex: 998 }}
            >
              {statusOptions.map((statusOption) => (
                <MenuItem key={statusOption.id} value={statusOption.id}>
                  {statusOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

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
          ) : props.projectBeignEdited ? (
            'Salvar '
          ) : (
            'Criar Projeto'
          )}
        </Button>
      </Styles.CreateProjectModalContainer>
    </BaseModal>
  )
}
