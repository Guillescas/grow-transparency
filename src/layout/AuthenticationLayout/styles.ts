import styled from 'styled-components'

import { device } from 'styles/breakpoints'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray[100]};

  header {
    margin-top: 50%;
  }

  .content {
    width: 18%;
    height: 100vh;

    @media ${device.laptop} {
      width: 40%;
    }

    @media ${device.mobile} {
      width: 80%;
    }

    h1 {
      color: ${({ theme }) => theme.colors.gray[500]};
    }

    button:focus {
      outline: none;
    }

    .form-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 1rem;
      flex-direction: column;

      a {
        cursor: pointer;
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.75rem;
  }
`
