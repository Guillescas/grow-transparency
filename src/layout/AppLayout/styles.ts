import styled from 'styled-components'

import { device } from 'styles/breakpoints'

export const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .topbar {
    display: none;

    @media ${device.laptop} {
      display: flex;
    }
  }

  .content {
    width: 100%;
    min-height: 100vh;

    margin-top: 0;

    padding: 2rem;

    background: ${({ theme }) => theme.colors.gray[100]};

    .loading-wrapper {
      width: 100%;
      margin: 0 auto;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      margin-top: 3rem;

      p {
        margin-top: 1rem;
        color: ${({ theme }) => theme.colors.gray[500]};
      }
    }

    @media ${device.laptop} {
      margin-top: 64px; // 64px from Topbar
      margin-left: 0;

      padding: 1rem;
    }

    .header {
      width: 100%;

      margin-bottom: 1.5rem;

      .title-wrapper {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;

        h1 {
          font-weight: 500;
          font-size: 1.75rem;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`
