import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin:0 ;
    box-sizing: border-box;
  }

  html{
    font-size:16px ;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
  }

  button{
    cursor: pointer;
  }

  li{
    list-style:none ;
  }
`;

export default GlobalStyle;
