import styled from "styled-components";

interface BackDropProps {
  src: string;
}

export const Intro = styled.div`
  position: absolute;
  width: 50%;
  top: 50%;
  left: 100px;
  transform: translate(0, -50%);
  z-index: 100;

  .title {
    margin: 0;
    text-align: left;
    color: #fff;
    font-size: 500%;
    font-weight: 900;
  }

  .description {
    margin: 0;
    text-align: left;
    color: #fff;
    font-size: 110%;
    font-weight: 400;
    line-height: 1.6;
  }
`;

export const Backdrop = styled.div<BackDropProps>`
  width: 100%;
  height: 100vh;
  background: ${(p) => `url(${p.src})`};
  background-size: cover;
  background-position: top;
  background-attachment: scroll;
  background-repeat: no-repeat;
`;

export const Overlay = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  background: linear-gradient(
    to right,
    rgba(1, 1, 1, 0.8),
    rgba(255, 255, 255, 0.15)
  );
`;

export const SlideButton = styled.button`
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem;
  outline: none;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 1px solid transparent;
    background-color: rgba(var(--pm-black), 0.7);
  }
`;

export const NextButton = styled(SlideButton)`
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
`;

export const PrevButton = styled(SlideButton)`
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
`;
