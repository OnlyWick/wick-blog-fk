import { Avatar, Button } from "antd";
import { ConfigConsumerProps } from "antd/es/config-provider";
import Link from "next/link";
import styled from "styled-components";

// const url =
//   "https://avatars.githubusercontent.com/u/53461157?s=400&u=cf8e8ca53bb3533ef721587ee5e61ae1965ba316&v=4";

interface IntroProps {
  config?: {
    username?: string;
    intro?: string[];
    fullscreen?: boolean;
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
  height: 200px;
  width: 100%;
  font-size: 20px;

  .ant-avatar img {
    transition: all 0.6s;
  }
  .ant-avatar img:hover {
    transform: scale(1.2);
  }

  @keyframes floating {
    0% {
      transform: translate(0, -4px);
    }

    50% {
      transform: translate(0, 4px);
    }

    100% {
      transform: translate(0, -4px);
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

const AuthorStatus = styled.div`
  width: 34px;
  height: 34px;
  background-color: #57bd6a;
  position: absolute;
  right: 10px;
  bottom: 0px;
  border-radius: 50%;
  border: 6px solid #fff;
`;
const Motto = styled.ul`
  color: var(--wick-gray);
  margin: 10px 0;
`;

const LeftFloating = styled.div`
  width: 49%;
  animation: 3s ease-in-out infinite floating;
  text-align: right;
  float: left;
  &:before {
    float: right;
    shape-outside: circle(farthest-side at right);
    content: "";
    width: 110px;
    height: 200px;
  }
`;

const RightFloating = styled.div`
  width: 49%;
  animation: 3s ease-in-out infinite floating;
  text-align: left;
  float: right;
  &:before {
    float: left;
    shape-outside: circle(farthest-side at left);
    content: "";
    width: 110px;
    height: 200px;
  }
`;

export default function Intro({ config }: IntroProps) {
  console.log(config);
  return (
    <InfoWrapper>
      <AvatarWrapper>
        {config?.fullscreen ? (
          <LeftFloating>
            🎵
            <br />
            <br />
            🎹
            <br />
            <br />
            🎸
            <br />
            <br />
            🥁
          </LeftFloating>
        ) : null}
        <Avatar
          // TODO: Antd SSR BUG
          // size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
          style={{
            position: "absolute",
            left: "50%",
            marginLeft: "-100px",
            zIndex: 100,
          }}
          size={200}
          draggable={false}
          src="/freddie.jpg"
        />
        {config?.fullscreen ? (
          <RightFloating>
            🎤
            <br />
            <br />
            💥
            <br />
            <br />
            🍺
            <br />
            <br />
            🎵
          </RightFloating>
        ) : null}
        {/* <AuthorStatus /> */}
      </AvatarWrapper>
      <UserName>OnlyWick</UserName>
      <Motto>
        生活不能没有音乐, 就像西方不能失去耶路撒冷。
        {config &&
          config.intro &&
          config.intro.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
      </Motto>
    </InfoWrapper>
  );
}
