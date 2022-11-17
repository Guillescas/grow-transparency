import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'

import { parseCookies } from 'nookies'
import { AppLayout } from 'layout/AppLayout'
import { cookiesNames } from 'constants/cookies'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { IProjectProps, IStatusProps } from 'components/Modals/ProjectModal/types'
import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { currencyFormatter } from 'utils/currencyForatter'

import { theme } from 'styles/themes/default'
import * as Styles from 'styles/pages/Home'

const Home: NextPage = () => {
  const [projects, setProjects] = useState<IProjectProps[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState('')

  const [statusOptions, setStatusOptions] = useState<IStatusProps[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedProjectId(event.target.value as string)
  }

  useEffect(() => {
    setIsLoading(true)

    APIClient()
      .get<IProjectProps[]>('/project')
      .then((response) => {
        setProjects(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    APIClient()
      .get('/status')
      .then((response) => {
        setStatusOptions(response.data)
      })
  }, [])

  const selectedProject = projects.find((project) => project.id === Number(selectedProjectId))

  interface Column {
    id: string
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string
  }

  const columns: Column[] = [
    { id: 'ID', label: 'ID', minWidth: 80 },
    { id: 'name', label: 'Nome do projeto', minWidth: 100 }
  ]

  return (
    <AppLayout>
      <Styles.HomeContainer>
        <header>
          <h1>Dashboard</h1>
        </header>

        <section>
          <h1>Overview de custos dos projetos</h1>

          <FormControl fullWidth size="small">
            <InputLabel id="project">Selecione um projeto</InputLabel>
            <Select
              labelId="project"
              id="project"
              value={selectedProjectId}
              label="Selecione um projeto"
              onChange={handleChange}
              size="small"
              style={{ zIndex: 998 }}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>

        {selectedProject && (
          <section id="reports">
            {isLoading ? (
              <div className="loading-wrapper">
                <Loading color={theme.colors.black} />
              </div>
            ) : (
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" width={200}>
                        <strong>Custo do projeto</strong>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {currencyFormatter(
                          Number(selectedProject.cost) / Number(selectedProject.totalTime)
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" width={200}>
                        <strong>Custo por hora</strong>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {currencyFormatter(Number(selectedProject.cost))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </section>
        )}

        <section id="projectsByStatus">
          <h1>Status dos projetos</h1>

          {statusOptions.map((statusOption) => (
            <Paper sx={{ width: '100%' }} key={statusOption.id} style={{ marginBottom: '1rem' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        Projetos com o status: <strong>{statusOption.name}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 57, minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {projects.map((project) => {
                      if (project.status.id === statusOption.id) {
                        return (
                          <TableRow hover key={project.id}>
                            <TableCell>{project.id}</TableCell>
                            <TableCell>{project.name}</TableCell>
                          </TableRow>
                        )
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}
        </section>
      </Styles.HomeContainer>
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
