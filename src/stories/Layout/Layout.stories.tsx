import { Meta, StoryObj } from "@storybook/react";
import Layout from "./Layout";
import Sider from "./Sider/Sider";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";

const meta: Meta<typeof Layout> = {
  title: "Layout/Layout",
  component: Layout,
};

export default meta;

type Story = StoryObj<typeof Layout>;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

export const First: Story = {
  render() {
    return (
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>Content</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    );
  },
};

export const Second: Story = {
  render() {
    return (
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sider style={siderStyle}>Sider</Sider>
          <Content style={contentStyle}>Content</Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    );
  },
};

export const Third: Story = {
  render() {
    return (
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Content style={contentStyle}>Content</Content>
          <Sider style={siderStyle}>Sider</Sider>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    );
  },
};

export const Fourth: Story = {
  render() {
    return (
      <Layout>
        <Sider style={siderStyle}>Sider</Sider>
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    );
  },
};

export const Sixth: Story = {
  render() {
    return (
      <Layout>
        <Header></Header>
        <Layout>
          <Content></Content>
          <Content></Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    );
  },
};

export const Seventh: Story = {
  render() {
    return (
      <Layout>
        <Header></Header>
        <Content></Content>
      </Layout>
    );
  },
};
