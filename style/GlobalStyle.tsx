import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;

    :focus-within {
      scroll-behavior: smooth;
    }
  }

  body {
    background: darkgrey;
    color: black;
    font-family: sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, a, label {
    font-weight: 400;
  }

  input, textarea, select, pre, a, button {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
  }

  ul, menu, li {
    list-style: none;
  }
`;
