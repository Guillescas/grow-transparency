import styled from 'styled-components'

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  form {
    background: ${({ theme }) => theme.colors.gray[200]};

    padding: 1rem;

    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    h1 {
      margin-bottom: 1.5rem;
    }

    > div {
      width: 100%;
    }

    button {
      width: 100%;
    }
  }
`
