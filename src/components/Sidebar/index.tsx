import { FiHome, FiList, FiLogOut } from 'react-icons/fi'
import Link from 'next/link'

import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

export function Sidebar() {
  const { signOut } = useAuth()

  return (
    <Styles.SidebarContainer>
      <div>
        <h1>Logo</h1>

        <nav>
          <Link href="/">
            <Styles.LinkContent>
              <FiHome />

              <a>Home</a>
            </Styles.LinkContent>
          </Link>

          <Link href="/reports">
            <Styles.LinkContent>
              <FiList />

              <a>Relatórios</a>
            </Styles.LinkContent>
          </Link>
        </nav>
      </div>

      <Styles.Footer onClick={signOut}>
        <FiLogOut />

        <a>Sair</a>
      </Styles.Footer>
    </Styles.SidebarContainer>
  )
}
