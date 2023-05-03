import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  height: 100%;
  flex: auto;
`;

interface ContentProps {
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}

export default function Content({ children, style }: ContentProps) {
  return <ContentWrapper style={style}>{children}</ContentWrapper>;
}
