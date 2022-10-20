import { Dispatch, SetStateAction } from 'react'

export interface IUserProps {
  email: string
  name: string
  lastName: string
}

export interface ICreadentialsProps {
  email: string
  password: string
}

export interface IAuthContextData {
  signIn: (props: ICreadentialsProps) => Promise<void>
  signOut: () => void
  user: IUserProps
  setUser: Dispatch<SetStateAction<IUserProps>>
}
