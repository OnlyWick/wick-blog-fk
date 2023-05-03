import styled from "styled-components";

const AboutWrapper = styled.div`
  text-align: center;
`;

const AboutContact = styled.div`
  text-align: center;
`;

export default function About() {
  return (
    <AboutWrapper>
      <h1>OnlyWick</h1>
      <AboutContact>联系方式</AboutContact>
    </AboutWrapper>
  );
}
