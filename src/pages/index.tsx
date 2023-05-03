import dynamic from "next/dynamic";
import styled from "styled-components";

const Sidebar = dynamic(() => import("@/stories/Sidebar/Sidebar"));
export async function getStaticProps(context: any) {
  // const res = await fetch("http://localhost:9396/site-config");
  // const siteConfig = await res.json();

  return {
    props: {
      siteConfig: /*siteConfig &&*/ {
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
  return (
    <>
      <Sidebar fullscreen={true}></Sidebar>
    </>
  );
}
