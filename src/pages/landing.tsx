import React from "react";
import { Button, Col, Layout, Row } from "antd";
import { Link } from "react-router-dom";
import "./landing.css";

const { Header, Content } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout style={{ margin: "0px", padding: "0px" }}>
      <Header>
        <Row justify={"end"}>
          <Col xs={2}>
            <Link to="/signin">
              <Button>Sign In</Button>
            </Link>
          </Col>
          <Col xs={2}>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </Col>
        </Row>
      </Header>
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
