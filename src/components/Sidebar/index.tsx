import { FiHome, FiList } from 'react-icons/fi'
import Link from 'next/link'

import * as Styles from './styles'

import { ISidebarProps } from './types'

export function Sidebar(props: ISidebarProps) {
  return (
    <Styles.Container>
      <h1>Logo</h1>

      <nav>
        <Link href="/">
          <>
            <FiHome />

            <a>Home</a>
          </>
        </Link>
        <Link href="/reports">
          <>
            <FiList />

            <a>Relatórios</a>
          </>
        </Link>
      </nav>

      <div className="footer"></div>
    </Styles.Container>
  )
}
