import { ReactElement } from 'react'

import * as Styles from './styles'

import { IAuthenticationLayoutProps } from './types'

export function AuthenticationLayout(props: IAuthenticationLayoutProps): ReactElement {
  return (
    <Styles.Container>
      <main className="content">{props.children}</main>
    </Styles.Container>
  )
}
