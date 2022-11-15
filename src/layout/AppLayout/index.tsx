import { ReactElement } from 'react'

import { Sidebar } from 'components/Sidebar'

import { IAppLayoutProps } from './types'

import * as Styles from './styles'

export function AppLayout(props: IAppLayoutProps): ReactElement {
  return (
    <Styles.Container>
      <Sidebar />

      <div className="content">{props.children}</div>
    </Styles.Container>
  )
}
