import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children?: ReactNode;
}

const HomeWrapper = styled.div`
  height: 100%;
  background: linear-gradient(to bottom, #17ead9, #6078ea);
  box-sizing: border-box;
  position: relative;
`;

const HomeContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function Home({ children, ...props }: Props) {
  return (
    <HomeWrapper>
      <HomeContent>{children}</HomeContent>
    </HomeWrapper>
  );
}
