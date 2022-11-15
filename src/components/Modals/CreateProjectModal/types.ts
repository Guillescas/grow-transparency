import { Dispatch, SetStateAction } from 'react'

export interface ICreateProjectFormProps {
  name: string
  description: string
  cost: string
  totalTime: string
  status: string
  score: string
  link: string
}

export interface ICreateProjectModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  title?: string
  maxWidth?: number | string
  maxHeight?: number | string

  setNewProject: Dispatch<SetStateAction<ICreateProjectFormProps>>
}
