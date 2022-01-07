import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
  box-sizing: border-box;
}

  :root {
    /** Colors */
    --pm-black: 31,38,62;
    --pm-error:#ff0033;
    --white: #ffffff;
    --black: #000000;
    --primary-text-color: #332e38;
    --secondary-text-color: #70657b;
    --dim-text-color: #47404f;
    --input-bg-color: #f8f9fa;
    --input-focus-color: #665c70;
    --light-white: #ced4da;
    --input-focus-border-color: #a679d2;
    --light-gray: #fafafa;
    /** Typography */
  }

  html{
    font-size: 16px;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family:'Open Sans', "Helvetica Neue", "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", 
      -apple-system, BlinkMacSystemFont, sans-serif !important;
   background-color: var(--white);
}
`;

export default GlobalStyle;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;
