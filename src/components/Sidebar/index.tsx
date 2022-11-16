import { FiFileText, FiHome, FiList, FiLogOut, FiUsers } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

export function Sidebar() {
  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <Styles.SidebarContainer>
      <div>
        <h1>Logo</h1>

        <nav>
          <Link href="/">
            <Styles.LinkContent isActive={router.asPath === '/'}>
              <FiHome />

              <a>Home</a>
            </Styles.LinkContent>
          </Link>

          {/* <Link href="/reports">
            <Styles.LinkContent isActive={router.asPath === '/reports'}>
              <FiList />

              <a>Relatórios</a>
            </Styles.LinkContent>
          </Link> */}

          <Link href="/projects">
            <Styles.LinkContent isActive={router.asPath === '/projects'}>
              <FiFileText />

              <a>Projetos</a>
            </Styles.LinkContent>
          </Link>

          {/* <Link href="/users">
            <Styles.LinkContent isActive={router.asPath === '/users'}>
              <FiUsers />

              <a>Usuários</a>
            </Styles.LinkContent>
          </Link> */}
        </nav>
      </div>

      <Styles.Footer onClick={signOut}>
        <FiLogOut />

        <a>Sair</a>
      </Styles.Footer>
    </Styles.SidebarContainer>
  )
}
