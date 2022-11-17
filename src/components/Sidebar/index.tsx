import { FiFileText, FiHome, FiLogOut, FiUsers } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { UserRolesEnum } from 'hooks/useAuth/types'
import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

export function Sidebar() {
  const { signOut, user } = useAuth()
  const router = useRouter()

  const userIsAdmin = user.roles.includes(UserRolesEnum.ROLE_ADMIN)

  return (
    <Styles.SidebarContainer>
      <div>
        <h1>
          Grow <span>transparency</span>
        </h1>

        <nav>
          <Link href="/">
            <Styles.LinkContent isActive={router.asPath === '/'}>
              <FiHome />

              <a>Home</a>
            </Styles.LinkContent>
          </Link>

          <Link href="/projects">
            <Styles.LinkContent isActive={router.asPath === '/projects'}>
              <FiFileText />

              <a>Projetos</a>
            </Styles.LinkContent>
          </Link>

          {userIsAdmin && (
            <Link href="/users">
              <Styles.LinkContent isActive={router.asPath === '/users'}>
                <FiUsers />

                <a>Usuários</a>
              </Styles.LinkContent>
            </Link>
          )}
        </nav>
      </div>

      <Styles.Footer onClick={signOut}>
        <FiLogOut />

        <a>Sair</a>
      </Styles.Footer>
    </Styles.SidebarContainer>
  )
}
