import { ReactElement } from 'react'

import * as Styles from './styles'

import { ILoginLayoutProps } from './types'

export function LoginLayout(props: ILoginLayoutProps): ReactElement {
  return (
    <Styles.Container>
      <main className="content">{props.children}</main>
    </Styles.Container>
  )
}
