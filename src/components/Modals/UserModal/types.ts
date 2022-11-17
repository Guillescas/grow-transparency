import { Dispatch, SetStateAction } from 'react'

import { UserRolesEnum } from 'hooks/useAuth/types'

export interface IUserProps {
  id: number
  name: string
  lastName: string
  email: string
  roles?: UserRolesEnum[]
}

export interface IUserModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  title?: string
  maxWidth?: number | string
  maxHeight?: number | string

  setNewUser: Dispatch<SetStateAction<IUserProps>>
  setUsers: Dispatch<SetStateAction<IUserProps[]>>
}
