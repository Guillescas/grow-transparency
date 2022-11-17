import { ThemeInterface } from '../@types/styled-components'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle<{ theme: ThemeInterface }>`
  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  body, html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  html {
    font-size: 100%;

    @media (max-width: 768px) {
      font-size: 97.5%;
    }
  }

  body,
  input,
  button {
    font-family: 'Inter', sans-serif;
    color: ${({ theme }) => theme.colors.black};

    font-size: 1rem;

    &:focus {
      outline: 1px solid ${({ theme }) => theme.colors.black};
    }
  }

  .MuiPopover-root {
    z-index: 999999 !important; // Override Mui styles on react-modal
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1500;
  }

  .react-modal-overlay-sidebar {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1500;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.1s;
    z-index: 1600;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8)
    }
  }
`
