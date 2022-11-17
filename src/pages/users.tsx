import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import { FiArrowUp, FiTrash } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { CSVLink } from 'react-csv'
import { parseCookies } from 'nookies'
import { AppLayout } from 'layout/AppLayout'
import { ErrorApiResponse } from 'interfaces/api'
import { cookiesNames } from 'constants/cookies'
import { AxiosError } from 'axios'
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

import { UserRolesEnum } from 'hooks/useAuth/types'

import { IUserProps } from 'components/Modals/UserModal/types'
import { UserModal } from 'components/Modals/UserModal'
import { Loading } from 'components/Loading'

import { APIClient } from 'services/api'

import { theme } from 'styles/themes/default'
import * as Styles from 'styles/pages/Users'

interface IUserBeignProps {
  isLoading: boolean
  userId: null | number
}

const Users: NextPage = () => {
  const [users, setUsers] = useState<IUserProps[]>([])
  const [isUsersLoading, setIsUsersLoading] = useState(true)

  const [userBeignDeleted, setUserBeignDeleted] = useState<IUserBeignProps>({
    isLoading: false,
    userId: null
  })
  const [userBeignPromoted, setUserBeignPromoted] = useState<IUserBeignProps>({
    isLoading: false,
    userId: null
  })

  const [newUser, setNewUser] = useState({} as IUserProps)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  const columns: GridColDef[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Nome', field: 'name' },
    { headerName: 'E-mail', field: 'email' },
    { headerName: 'Cargo', field: 'role' },
    { field: 'actions', headerName: 'Ações' }
  ]

  function handleseOpenUserModal() {
    setIsUserModalOpen(true)
  }
  function handleseCloseUserModal() {
    setIsUserModalOpen(false)
  }

  function handleDeleteUser(userId: number) {
    setUserBeignDeleted({
      isLoading: true,
      userId: userId
    })

    APIClient()
      .delete(`/user/${userId}`, {
        params: {
          id: userId
        }
      })
      .then(() => {
        setUsers((prevState) => prevState.filter((user) => user.id !== userId))

        toast.success('Usuário deletado com sucesso')
      })
      .catch((error: AxiosError<ErrorApiResponse>) => {
        toast.error(error.response?.data.message || 'Erro inesperado')
      })
      .finally(() => {
        setUserBeignDeleted({
          isLoading: false,
          userId: null
        })
      })
  }

  function handleMakeUserAsAdmin(userId: number) {
    setUserBeignPromoted({
      isLoading: true,
      userId: userId
    })

    APIClient()
      .put(`/user/admin/${userId}`)
      .then(() => {
        setUsers((prevState) =>
          prevState.map((user) => {
            if (user.id === userId) {
              const previousRoles = user.roles || []

              return {
                ...user,
                roles: [...previousRoles, UserRolesEnum.ROLE_ADMIN]
              }
            }

            return user
          })
        )

        toast.success('Usuário promovido a administrador com sucesso')
      })
      .finally(() => {
        setUserBeignPromoted({
          isLoading: false,
          userId: null
        })
      })
  }

  const CSVheaders = [
    { label: 'ID', key: 'id' },
    { label: 'Nome', key: 'name' },
    { label: 'E-mail', key: 'email' },
    { label: 'Cargos', key: 'roles' }
  ]

  function getFormatedRoles(role: UserRolesEnum) {
    switch (role) {
      case UserRolesEnum.ROLE_ADMIN:
        return 'Admin'
      case UserRolesEnum.ROLE_USER:
        return 'Usuário'
    }
  }

  useEffect(() => {
    APIClient()
      .get<IUserProps[]>('/user/all')
      .then((response) => {
        setUsers(response.data)
      })
      .finally(() => {
        setIsUsersLoading(false)
      })
  }, [])

  useEffect(() => {
    setUsers((prevState) => [...prevState, newUser])
  }, [newUser])

  return (
    <AppLayout>
      <Styles.UsersContainer>
        <header>
          <h1>Usuários</h1>

          <Button type="button" variant="contained" size="small" onClick={handleseOpenUserModal}>
            Criar Usuário
          </Button>
        </header>

        <section>
          <CSVLink
            headers={CSVheaders}
            data={users}
            filename="usuarios.csv"
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <Button type="button">Exportar em CSV</Button>
          </CSVLink>
        </section>

        {isUsersLoading ? (
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
                {users &&
                  users.map((user) => {
                    const isUserAdmin = user.roles?.includes(UserRolesEnum.ROLE_ADMIN)

                    return (
                      <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {user.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {user.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {user.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {user.roles?.map((role) => {
                            return getFormatedRoles(role)
                          })}
                        </TableCell>
                        <TableCell component="th" scope="row" width={160}>
                          <Button
                            type="button"
                            onClick={() => handleMakeUserAsAdmin(user.id)}
                            title="Promover para administrador"
                            disabled={isUserAdmin || userBeignPromoted.isLoading}
                          >
                            {userBeignPromoted.isLoading && userBeignPromoted.userId === user.id ? (
                              <Loading width={12} height={12} color={theme.colors.black} />
                            ) : (
                              <FiArrowUp />
                            )}
                          </Button>

                          <Button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={userBeignDeleted.isLoading}
                          >
                            {userBeignDeleted.isLoading && userBeignDeleted.userId === user.id ? (
                              <Loading width={12} height={12} color={theme.colors.black} />
                            ) : (
                              <FiTrash />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <UserModal
          isModalOpen={isUserModalOpen}
          handleCloseModal={handleseCloseUserModal}
          maxWidth={800}
          setNewUser={setNewUser}
          setUsers={setUsers}
        />
      </Styles.UsersContainer>
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

export default Users
