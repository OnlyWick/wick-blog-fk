import { Avatar, Button } from "antd";
import styled from "styled-components";

const url =
  "https://avatars.githubusercontent.com/u/53461157?s=400&u=cf8e8ca53bb3533ef721587ee5e61ae1965ba316&v=4";

const InfoWrapper = styled.div`
  text-align: center;
`;

const AvatarWrapper = styled.div`
  user-select: none;
  position: relative;
  display: inline-block;
  margin: 0 auto;

  & {
    ::before {
      position: absolute;
      transform: translate(-50%, -50%);
      content: "";
      left: 50%;
      top: 50%;
      width: 98%;
      height: 98%;
      border-radius: 50%;
      overflow: hidden;
      animation: halation 3s infinite ease-in-out;
    }

    @keyframes halation {
      0% {
        box-shadow: 0 0 10px #2517ea;
      }
      35% {
        box-shadow: 0 0 30px #00ff1e;
      }
      50% {
        box-shadow: 0 0 50px #d63aff;
      }
      65% {
        box-shadow: 0 0 30px #9900ff;
      }
      100% {
        box-shadow: 0 0 10px #2517ea;
      }
    }

    .ant-avatar img {
      transition: all 0.6s;
    }
    .ant-avatar img:hover {
      transform: scale(1.2);
    }
  }
`;

const UserName = styled.h1`
  user-select: none;
`;
const Motto = styled.p`
  color: var(--wick-gray);
`;

export default function Intro() {
  return (
    <InfoWrapper>
      <AvatarWrapper>
        <Avatar
          size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
          draggable={false}
          src={url}
        />
      </AvatarWrapper>
      <UserName>Wick</UserName>
      <Motto>
        <p>Fans of Queen~🎵</p>
      </Motto>
      <Button ghost={true}>博客</Button>
      <Button ghost={true}>照片集</Button>
      <Button ghost={true}>关于</Button>
    </InfoWrapper>
  );
}
