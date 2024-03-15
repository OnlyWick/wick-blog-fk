import { Avatar } from "@douyinfe/semi-ui";
import Image from "next/image";
import styled from "styled-components";

interface UserInfoProps {
  config?: {
    username?: string;
    intro?: string[];
  };
}

const UserName = styled.h1`
  /* background:  */
  /* -webkit-text-fill-color: transparent; */
`;

const Motto = styled.ul`
  color: var(--wick-gray);
  margin: var(--wick-medium-margin) 0;
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

export default function UserInfo({ config }: UserInfoProps) {
  return (
    <div className="w-full">
      <section className="flex mb-12">
        <div className="inline-block relative select-none m-auto">
          <div className="text-[42px] inline-block rotate-[20deg] absolute top-[-12px] right-[54px] z-[1]">
            👑
          </div>
          <Image className="rounded" width={200} height={200} src="/freddie.jpg" alt="" />
        </div>
        <section className="flex-1 ml-4">
          <h1 className="bg-gradient-to-br from-blue-400 to-indigo-700 bg-clip-text text-transparent font-bold select-none text-3xl mb-4">Wick</h1>
          <Motto>
            生活不能没有音乐, 就像西方不能失去耶路撒冷。
          </Motto>
        </section>
      </section>
      <article style={{ margin: "auto" }}>
        <p>
          皇后乐队的狂热粉丝, 摇滚无时无刻在粉刷我的灵魂
        </p>
        <p>
          我需要唤醒大多数记忆...
        </p>
      </article>
    </div>
  );
}
