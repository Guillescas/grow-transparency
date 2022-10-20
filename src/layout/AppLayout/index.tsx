import { ReactElement } from 'react'

import { Sidebar } from 'components/Sidebar'

import * as Styles from './styles'

import { IAppLayoutProps } from './types'

export function AppLayout(props: IAppLayoutProps): ReactElement {
  return (
    <Styles.Container>
      <Sidebar className="sidebar" />

      <div className="content">{props.children}</div>
    </Styles.Container>
  )
}
