import { FC } from "react";
import { Button, Col, Form, Layout, Row, Select } from "antd";
import { Link, useHistory } from "react-router-dom";

const LandingNavbar: FC = () => {
  const { Header } = Layout;
  const history = useHistory();

  const onFinish = (values: any) => {
    switch (values.statName) {
      case "mostActiveCompanies":
        history.push("/most-active-companies");
        break;
      case "avgRatingCompanies":
        history.push("/avg-most-rating-companies");
        break;
    }
  };

  return (
    <Header style={{ height: "15vh" }}>
      <Row justify="space-between" align="middle">
        <Col xs={24} md={4}>
          <Link to="/">
            <h2 style={{ textAlign: "center", color: "white" }}>NE YASADIN</h2>
          </Link>
        </Col>
        <Col xs={24} md={12}>
          <Form style={{ padding: "20px" }} onFinish={onFinish}>
            <Form.Item name="statName">
              <Select defaultValue="Statistics" style={{ width: "100%" }}>
                <Select.Option value="mostActiveCompanies">
                  Most Active Companies
                </Select.Option>
                <Select.Option value="avgRatingCompanies">
                  Highest Solution Average of Subscribers
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Search For Statistics
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} md={4} style={{ textAlign: "right" }}>
          <Link to="/signin">
            <Button style={{ marginRight: "10px" }}>Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </Col>
      </Row>
    </Header>
  );
};

export default LandingNavbar;
