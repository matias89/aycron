import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-size: 16px;
    background: #f5f5f5;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
  }
  hr {
    border: 0;
    height: 1px;
    margin: 10px 0;
    background-color: #333333;
  }
`;
 
export default GlobalStyle;
