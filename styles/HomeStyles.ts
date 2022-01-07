import styled from "styled-components";

interface HomeContainerProps {
  src: string;
}

export const HomeContainer = styled.main<HomeContainerProps>`
  width: 100%;
  height: 100vh;
  background: ${(p) => `url(${p.src})`};
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
  background-repeat: no-repeat;
`;
