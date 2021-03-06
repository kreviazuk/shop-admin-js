import React from "react";
import { Layout,  Breadcrumb } from "antd";
import styled from "@emotion/styled";
import { SiderBar } from "./component/sider";
import {Outlet} from 'react-router'

const { Header, Content, Sider } = Layout;
export const LayoutPage = () => {
  return (
    <LayoutCard>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <SiderH />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          > 
          <Outlet />
          </Content>
        </Layout>
      </Layout>
    </LayoutCard>
  );
};

const LayoutCard = styled(Layout)`
  width: 100vw;
  min-height: 100vh;
`;

const SiderH = styled(SiderBar)`
  min-height: calc (100vh -6.4rem);
  background: white;
`