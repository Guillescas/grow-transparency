import { Dispatch, SetStateAction } from 'react'

export interface IUserProps {
  email?: string
  name?: string
  lastName?: string
  roles: string[]
}

export interface ICreadentialsProps {
  email: string
  password: string
}

export interface IUserSignUpProps {
  name: string
  lastName: string
  email: string
  password: string
}

export interface ISignInApiResponseProps {
  token: string
  roles: string[]
}

export interface IAuthContextData {
  signup: (props: IUserSignUpProps) => Promise<void>
  signIn: (props: ICreadentialsProps, callback: () => void) => Promise<void>
  signOut: () => void
  user: IUserProps
  setUser: Dispatch<SetStateAction<IUserProps>>
}
