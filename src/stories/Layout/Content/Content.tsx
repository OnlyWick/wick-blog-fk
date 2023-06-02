import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const ContentWrapper = styled.main`
  flex: auto;
  box-sizing: border-box;
  min-height: 0;
  /* width: 0;
  min-width: 0; */
`;

interface ContentProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}

export default function Content({ children, style }: ContentProps) {
  return <ContentWrapper style={style}>{children}</ContentWrapper>;
}
