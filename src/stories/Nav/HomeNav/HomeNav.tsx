import Intro from "../../Sidebar/UserWidget/Info";
import styled from "styled-components";
import Link from "next/link";
import SiteConfig from "@/stories/SiteConfig";
import { Button, Icon } from "@douyinfe/semi-ui";
import IconTwitter from "@/stories/icon/x";
import IconGitHub from "@/stories/icon/github";

interface HomeProps {
  username?: string;
  avatar?: string;
  motto?: string[];
  siteConfig?: {
    approve: string;
    copyright: string;
  };
}

const HomeNavWrapper = styled.div`
`;

const HomeContent = styled.div`
`;

export default function HomeNav({ siteConfig }: HomeProps) {
  return (
    <div className="max-w-5xl m-auto py-10 box-border">
      <Intro></Intro>
      <div className="mt-4 flex items-center">
        <span className="mr-2">你可以在这里找到我:</span>
        <ul className="flex gap-2">
          <li className="hover:border-b border-solid pb-0.5 box-border">
            <a href="https://twitter.com/Wick1024" className="flex items-center "><span className="mr-0.5"><IconTwitter /></span>Twitter</a>
          </li>
          <li className="hover:border-b border-solid pb-0.5 box-border">
            <a href="https://github.com/OnlyWick" className="flex items-center"><span className="mr-0.5"><IconGitHub /></span>GitHub</a>
          </li>
        </ul>
      </div>
      <Button icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M10.159 10.72a.75.75 0 1 0 1.06 1.06l3.25-3.25L15 8l-.53-.53l-3.25-3.25a.75.75 0 0 0-1.061 1.06l1.97 1.97H1.75a.75.75 0 1 0 0 1.5h10.379z" clip-rule="evenodd" /></svg>}>
      </Button>
      <SiteConfig
        config={{
          approve: siteConfig?.approve,
          copyright: siteConfig?.copyright,
        }}
      ></SiteConfig>
    </div>
  );
}
