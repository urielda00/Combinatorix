import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Segoe UI", sans-serif;
    background-color: #eaeaea;
    color: #333;
  }
`;