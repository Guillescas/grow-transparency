import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import { FiEdit2, FiTrash } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { CSVLink } from 'react-csv'
import { parseCookies } from 'nookies'
import { AppLayout } from 'layout/AppLayout'
import { ErrorApiResponse } from 'interfaces/api'
import { cookiesNames } from 'constants/cookies'
import axios, { AxiosError } from 'axios'
import { GridColDef } from '@mui/x-data-grid'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { IProjectProps } from 'components/Modals/ProjectModal/types'
import { ProjectModal } from 'components/Modals/ProjectModal'
import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { currencyFormatter } from 'utils/currencyForatter'

import { theme } from 'styles/themes/default'
import * as Styles from 'styles/pages/Projects'

interface IProjectBeignDeletedProps {
  isLoading: boolean
  projectId: null | number
}

const Projects: NextPage = () => {
  const cookies = parseCookies()

  const [projects, setProjects] = useState<IProjectProps[]>([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)

  const [projectBeignDeleted, setProjectBeignDeleted] = useState<IProjectBeignDeletedProps>({
    isLoading: false,
    projectId: null
  })
  const [projectBeignEdited, setProjectBeignEdited] = useState<IProjectProps | null>(null)

  const [newProject, setNewProject] = useState({} as IProjectProps)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'description', headerName: 'Descrição' },
    { field: 'cost', headerName: 'Custo' },
    { field: 'status', headerName: 'Status' },
    { field: 'score', headerName: 'Score' },
    { field: 'link', headerName: 'Link' },
    { field: 'actions', headerName: 'Ações' }
  ]

  function handleseOpenProjectModal() {
    setIsProjectModalOpen(true)
  }
  function handleseCloseProjectModal() {
    setIsProjectModalOpen(false)
    setProjectBeignEdited(null)
  }

  function handleDeleteProject(projectId: number) {
    setProjectBeignDeleted({
      isLoading: true,
      projectId: projectId
    })

    APIClient()
      .delete(`/project/${projectId}`)
      .then(() => {
        setProjects((prevState) => prevState.filter((project) => project.id !== projectId))

        toast.success('Projeto deletado com sucesso')
      })
      .catch((error: AxiosError<ErrorApiResponse>) => {
        toast.error(error.response?.data.message || 'Erro inesperado')
      })
      .finally(() => {
        setProjectBeignDeleted({
          isLoading: false,
          projectId: null
        })
      })
  }

  function handleUpdateProject(project: IProjectProps) {
    setProjectBeignEdited(project)
    setIsProjectModalOpen(true)
  }

  const CSVheaders = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'name' },
    { label: 'Descrição', key: 'description' },
    { label: 'Custo', key: 'cost' },
    { label: 'Status', key: 'status' },
    { label: 'Score', key: 'score' },
    { label: 'Link', key: 'link' },
    { label: 'Ações', key: 'actions' }
  ]

  useEffect(() => {
    APIClient()
      .get<IProjectProps[]>('/project')
      .then((response) => {
        setProjects(response.data)
      })
      .finally(() => {
        setIsProjectsLoading(false)
      })
  }, [])

  useEffect(() => {
    setProjects((prevState) => [...prevState, newProject])
  }, [newProject])

  return (
    <AppLayout>
      <Styles.ProjectsContainer>
        <header>
          <h1>Projetos</h1>

          <Button type="button" variant="contained" size="small" onClick={handleseOpenProjectModal}>
            Criar Projeto
          </Button>
        </header>

        <section>
          <CSVLink
            headers={CSVheaders}
            data={projects}
            filename="projetos.csv"
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <Button type="button">Exportar em CSV</Button>
          </CSVLink>
        </section>

        {isProjectsLoading ? (
          <div className="loading-wrapper">
            <Loading color={theme.colors.black} />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.field}>{column.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {projects &&
                  projects.map((project) => (
                    <TableRow
                      key={project.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {project.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {currencyFormatter(Number(project.cost))}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.status?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {project.score}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.link}
                        </a>
                      </TableCell>
                      <TableCell component="th" scope="row" width={160}>
                        <Button type="button" onClick={() => handleUpdateProject(project)}>
                          <FiEdit2 />
                        </Button>

                        <Button
                          type="button"
                          onClick={() => handleDeleteProject(project.id)}
                          disabled={projectBeignDeleted.isLoading}
                        >
                          {projectBeignDeleted.isLoading &&
                          projectBeignDeleted.projectId === project.id ? (
                            <Loading width={12} height={12} color={theme.colors.black} />
                          ) : (
                            <FiTrash />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <ProjectModal
          isModalOpen={isProjectModalOpen}
          handleCloseModal={handleseCloseProjectModal}
          maxWidth={800}
          setNewProject={setNewProject}
          setProjects={setProjects}
          projectBeignEdited={projectBeignEdited}
        />
      </Styles.ProjectsContainer>
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

export default Projects
