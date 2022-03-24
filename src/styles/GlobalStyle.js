import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin:0 ;
    box-sizing: border-box;
  }

  html{
    font-size:16px ;
  }

  @media screen and (max-width: 1040px) {
    html {
    font-size: 12px;
    }
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
