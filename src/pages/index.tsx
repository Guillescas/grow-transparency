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
  TableRow
} from '@mui/material'

import { IProjectProps } from 'components/Modals/ProjectModal/types'
import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { currencyFormatter } from 'utils/currencyForatter'

import { theme } from 'styles/themes/default'
import * as Styles from 'styles/pages/Home'

const Home: NextPage = () => {
  const [projects, setProjects] = useState<IProjectProps[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState('')

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

  const selectedProject = projects.find((project) => project.id === Number(selectedProjectId))

  return (
    <AppLayout>
      <Styles.HomeContainer>
        <section>
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
