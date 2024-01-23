import React from "react";
import { Col, Layout, Row } from "antd";
import "./landing.css";
import LandingNavbar from "./landing-navbar";
import "./landing.css";

const { Content } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout
      style={{ margin: "0px", padding: "0px" }}
      className="landing-background"
    >
      <LandingNavbar />
      <Content style={{ padding: "200px" }}>
        <Row
          justify={"center"}
          align={"top"}
          style={{ height: "100vh", width: "100%" }}
        >
          <Col xs={24}>
            <h1 className="landing-text">
              This platform is a free platform where people can express their
              opinions about companies without fear and companies can respond to
              criticism.!
            </h1>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LandingPage;
