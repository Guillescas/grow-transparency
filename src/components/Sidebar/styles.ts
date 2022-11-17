import styled from 'styled-components'

import { ILinkContentProps } from './types'

export const SidebarContainer = styled.div`
  width: 230px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > div {
    width: 100%;

    h1 {
      text-align: center;
      margin: 2rem 0;

      font-family: ${({ theme }) => theme.font.family.Caveat};
    }

    nav {
      width: 100%;
    }
  }
`

export const LinkContent = styled.a<ILinkContentProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;

  cursor: pointer;

  background: ${({ theme, isActive }) => (isActive ? theme.colors.gray[200] : 'transparent')};

  padding: 0.75rem 1rem;

  transition: background-color 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[300]};
  }

  svg {
    margin-right: 1rem;
  }
`

export const Footer = styled(LinkContent)`
  margin-bottom: 1rem;

  button {
    background: none;
    border: none;
  }
`
