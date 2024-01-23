import { FC } from "react";
import { Button, Col, Layout, Row } from "antd";
import { Link } from "react-router-dom";

const LandingNavbar: FC = () => {
  const { Header } = Layout;
  return (
    <Header>
      <Row justify={"end"}>
        <Col xs={8}>
          <Link to="/most-active-companies">
            <span
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Most Active Companies
            </span>
          </Link>
        </Col>
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
  );
};

export default LandingNavbar;
