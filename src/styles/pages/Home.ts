import styled from 'styled-components'

export const HomeContainer = styled.div`
  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
    }
  }

  section {
    margin: 2rem 0;

    &:first-child {
      margin-top: 0;
    }

    h1 {
      margin-bottom: 1rem;
    }

    .loading-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  section#reports {
    margin-top: 2rem;
  }
`
