import { Dispatch, SetStateAction } from 'react'

export interface IProjectProps {
  id: number
  name: string
  description: string
  cost: string
  totalTime: string
  status: string
  score: string
  link: string
}

export interface IProjectModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  title?: string
  maxWidth?: number | string
  maxHeight?: number | string

  setNewProject: Dispatch<SetStateAction<IProjectProps>>
  setProjects: Dispatch<SetStateAction<IProjectProps[]>>
  projectBeignEdited: IProjectProps | null
}
