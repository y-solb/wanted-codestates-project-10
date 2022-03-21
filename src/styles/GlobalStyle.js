import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html{
    font-size:16px ;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
  }
`;

export default GlobalStyle;
