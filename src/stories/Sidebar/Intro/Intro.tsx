import { Avatar, Button } from "antd";
import { ConfigConsumerProps } from "antd/es/config-provider";
import Link from "next/link";
import styled from "styled-components";

// const url =
//   "https://avatars.githubusercontent.com/u/53461157?s=400&u=cf8e8ca53bb3533ef721587ee5e61ae1965ba316&v=4";

interface IntroProps {
  config?: {
    username: string;
    intro: string[];
  };
}

const InfoWrapper = styled.div`
  text-align: center;
`;

const AvatarWrapper = styled.div`
  user-select: none;
  position: relative;
  display: inline-block;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;

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
      /* animation: halation 3s infinite ease-in-out; */
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
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  line-height: 1.25;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Motto = styled.ul`
  color: var(--wick-gray);
  margin: 10px 0;
`;

export default function Intro({ config }: IntroProps) {
  return (
    <InfoWrapper>
      <AvatarWrapper>
        <Avatar
          // TODO: Antd SSR BUG
          // size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
          size={200}
          draggable={false}
          src="/freddie.jpg"
        />
      </AvatarWrapper>
      <UserName>OnlyWick</UserName>
      <Motto>
        Fans of Queen~🎵
        {config &&
          config.intro &&
          config.intro.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
      </Motto>
    </InfoWrapper>
  );
}
