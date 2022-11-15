import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { FiEdit2, FiTrash } from 'react-icons/fi'
import { AppLayout } from 'layout/AppLayout'
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

import { ICreateProjectFormProps } from 'components/Modals/CreateProjectModal/types'
import { CreateProjectModal } from 'components/Modals/CreateProjectModal'
import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { currencyFormatter } from 'utils/currencyForatter'

import { theme } from 'styles/themes/default'
import * as Styles from 'styles/pages/Projects'

interface IProjectsProps {
  name: string
  description: string
  cost: string
  totalTime: string
  status: string
  score: string
  link: string
}

const Projects: NextPage = () => {
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)
  const [projects, setProjects] = useState<IProjectsProps[]>([])
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({} as ICreateProjectFormProps)

  useEffect(() => {
    APIClient()
      .get<IProjectsProps[]>('/project')
      .then((response) => {
        setProjects(response.data)
      })
      .finally(() => {
        setIsProjectsLoading(false)
      })
  }, [])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'description', headerName: 'Descrição' },
    { field: 'cost', headerName: 'Custo' },
    { field: 'status', headerName: 'Status' },
    { field: 'score', headerName: 'Score' },
    { field: 'link', headerName: 'Link' },
    { field: 'actions', headerName: 'Ações' }
  ]

  const rows: IProjectsProps[] = projects.map((project, index) => {
    return {
      id: index + 1,
      ...project
    }
  })

  function handleseOpenCreateProjectModal() {
    setIsCreateProjectModalOpen(true)
  }
  function handleseCloseCreateProjectModal() {
    setIsCreateProjectModalOpen(false)
  }

  useEffect(() => {
    setProjects((prevState) => [...prevState, newProject])
  }, [newProject])

  return (
    <AppLayout>
      <Styles.ProjectsContainer>
        <header>
          <h1>Projetos</h1>

          <Button
            type="button"
            variant="contained"
            size="small"
            onClick={handleseOpenCreateProjectModal}
          >
            Criar Projeto
          </Button>
        </header>

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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {currencyFormatter(Number(row.cost))}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.status}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.score}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <a href={row.link} target="_blank" rel="noreferrer">
                        {row.link}
                      </a>
                    </TableCell>
                    <TableCell component="th" scope="row" width={160}>
                      <Button>
                        <FiEdit2 />
                      </Button>
                      <Button>
                        <FiTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <CreateProjectModal
          isModalOpen={isCreateProjectModalOpen}
          handleCloseModal={handleseCloseCreateProjectModal}
          maxWidth={800}
          setNewProject={setNewProject}
        />
      </Styles.ProjectsContainer>
    </AppLayout>
  )
}

export default Projects
