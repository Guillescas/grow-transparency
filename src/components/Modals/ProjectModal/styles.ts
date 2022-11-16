import styled from 'styled-components'

import { device } from 'styles/breakpoints'

export const CreateProjectModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 500px;

  @media ${device.smallTablet} {
    min-width: 100vw;
  }

  > div {
    margin: 1rem 0 0;
  }

  button {
    margin-top: 1rem;
  }
`
