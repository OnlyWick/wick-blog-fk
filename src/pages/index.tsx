import { Button, Modal } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Sidebar = dynamic(() => import("@/stories/Sidebar/Sidebar"));

export async function getStaticProps(context: any) {
  const res = await fetch("http://localhost:9396/site-config");
  const siteConfig = await res.json();
  // console.log(siteConfig);

  return {
    props: {
      siteConfig: siteConfig && {
        username: "OnlyWick",
      },
    },
    revalidate: 10,
  };
}

interface HomeProps {
  siteConfig: {
    username: string;
    intro: string[];
    approve: string;
    copyright: string;
  };
}

export default function Home({ siteConfig }: HomeProps) {
  useEffect(() => {
    document.addEventListener(
      "touchmove",
      function (event: any) {
        if (event.scale !== 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  });

  return (
    <>
      <Sidebar fullscreen={true}></Sidebar>
    </>
  );
}
