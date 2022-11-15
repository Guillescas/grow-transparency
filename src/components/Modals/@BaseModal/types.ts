import { ReactNode } from 'react'

export interface IBaseModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  title?: string
  children: ReactNode
  maxWidth?: number | string
  maxHeight?: number | string
}

export interface IBaseModalContainerProps {
  maxWidth?: number | string
  maxHeight?: number | string
}
