import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    background: #000;
    color: #fff;
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    &.no-scroll {
      overflow: hidden;
    }
  }

  .App {
    overflow: hidden;
    background:rgb(3, 3, 3);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  button, input, textarea {
    font-family: 'Poppins', sans-serif;
  }

  /* Adjust font weights for different elements */
  .nav-text {
    font-weight: 500;
  }

  .title {
    font-weight: 700;
  }

  .subtitle {
    font-weight: 500;
  }

  .body-text {
    font-weight: 400;
  }

  .light-text {
    font-weight: 300;
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