import styled from 'styled-components'

export const UsersContainer = styled.div`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
    }
  }

  section {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;

    margin-bottom: 1rem;
  }

  .loading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
