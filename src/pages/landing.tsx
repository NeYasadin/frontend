import React from "react";
import { Col, Layout, Row } from "antd";
import "./landing.css";
import LandingNavbar from "./landing-navbar";

const { Content } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout style={{ margin: "0px", padding: "0px" }}>
      <LandingNavbar />
      <Content style={{ padding: "30px" }}>
        <Row
          justify={"center"}
          align={"middle"}
          style={{ height: "100vh", width: "100%" }}
        >
          <Col>
            <h1>Welcome to NeYaşadın!</h1>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LandingPage;
