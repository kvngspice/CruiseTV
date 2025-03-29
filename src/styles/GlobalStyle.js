import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: #0a0a0a;  // Dark background
    color: #ffffff;
    
    &.no-scroll {
      overflow: hidden;
    }
  }

  .App {
    overflow: hidden;
    background:rgb(3, 3, 3);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    color: #ffffff;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  // Add support for iOS safe areas
  @supports (padding: max(0px)) {
    body {
      padding-left: min(0vmin, env(safe-area-inset-left));
      padding-right: min(0vmin, env(safe-area-inset-right));
      padding-bottom: min(0vmin, env(safe-area-inset-bottom));
    }
  }
`;

export default GlobalStyle; 