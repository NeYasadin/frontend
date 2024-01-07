import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/signin">Sign In</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px" }}>
        <h1>Welcome to NeYaşadın!</h1>
        <p>This is the landing page content.</p>
      </Content>
    </Layout>
  );
};

export default LandingPage;
