import { SideSheet, Button, Switch, Icon } from "@douyinfe/semi-ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DrawerContent from "../DrawerContentNav";
import IconMoon from "@/stories/icon/moon";
import IconSun from "@/stories/icon/sun";
import IconMenu from "@/stories/icon/menu";

const TopNavWrapper = styled.div`
  @media screen and (min-width: 769px) {
    padding: 0 50px;
  }

  @media screen and (max-width: 959px) {
    padding: 0 10px;
  }
`;

export default function TopNav() {
  const [mode, setMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const change = () => {
    setVisible(!visible);
  };

  const switchMode = () => {
    const body = document.body;
    // document.body.classList.toggle('dark')
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
      body.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark')
      setMode(true)
    } else {
      body.setAttribute('theme-mode', 'dark');
      body.dataset.theme = "dark"
      document.documentElement.classList.add('dark')
      setMode(false)
    }
  };

  useEffect(() => {
    const body = document.body;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (!body.hasAttribute('theme-mode')) {
        body.setAttribute('theme-mode', 'dark');
      }
      body.setAttribute('theme-mode', 'dark');
      document.documentElement.classList.add('dark')
      setMode(false)
    } else {
      if (body.hasAttribute('theme-mode')) {
        body.removeAttribute('theme-mode');
      }
      document.documentElement.classList.remove('dark')
      setMode(true)
    }
  }, [])

  return (
    <nav className="bg-[--wick-bg] w-full h-12 flex z-10 px-6 items-center justify-between fixed box-border border-b border-solid border-gray-300 dark:border-gray-500">
      <Link href="/"><Icon svg={"Wick"} onClick={() => void (location.href = "/")} /></Link>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/blog">博客</Link>
        </li>
        <li>
          <Link href="/catalog">笔记</Link>
        </li>
        <li className="flex items-center">
          <Switch style={{ backgroundColor: "transparent", border: `${mode ? "1px solid rgb(209 213 219)" : "1px solid rgb(107 114 128)"}` }} checkedText={<Icon size="small" style={{ color: "#fff" }} svg={<IconMoon />} />} uncheckedText={<Icon style={{ color: "#ff2323" }} size="small" svg={<IconSun />} />}
            checked={!mode} onChange={switchMode} />
        </li>
        <li>
          <Button
            theme="borderless"
            icon={<IconMenu />}
            onClick={change}
          >
          </Button>
        </li>
      </ul>
      <SideSheet
        visible={visible}
        placement="right"
        width={300}
        closable={false}
        maskStyle={{
          backdropFilter: "saturate(180%) blur(2px)",
        }}
        onCancel={change}
      >
        <DrawerContent></DrawerContent>
      </SideSheet>
    </nav>
  );
}
