import { ReactNode, FC } from "react";
import styled from "styled-components";

interface Props {
  config: {
    approve?: string;
    copyright?: string;
  };
  children: ReactNode;
}

const SiteConfigWrapper = styled.ul`
  display: flex;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

export default function SiteConfig({ children, config }: Partial<Props>) {
  return (
    <>
      <SiteConfigWrapper>
        {<li>{config && config.copyright}</li>}
        {<li>{config && config.approve}</li>}
      </SiteConfigWrapper>
    </>
  );
}
