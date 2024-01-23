import { FC } from "react";
import { Button, Col, Form, Layout, Row, Select } from "antd";
import { Link, useHistory } from "react-router-dom";

const LandingNavbar: FC = () => {
  const { Header } = Layout;
  const history = useHistory();
  const onFinish = (values: any) => {
    if (values.statName === "mostActiveCompanies") {
      history.push("/most-active-companies");
    }
  };
  return (
    <Header style={{ height: "15vh" }}>
      <Row justify={"end"} align={"middle"}>
        <Col xs={20}>
          <Row>
            <Col xs={12}></Col>
            <Col xs={12}></Col>
          </Row>
          <Form style={{ padding: "20px" }} onFinish={onFinish}>
            <Form.Item name="statName">
              <Select defaultValue={"Statistics"} style={{ width: "30%" }}>
                <Select.Option
                  onClick={(value: any) => console.log(value)}
                  value="mostActiveCompanies"
                >
                  Most Active Companies
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search For Statistics
              </Button>
            </Form.Item>
          </Form>

          {/* <Link to="/most-active-companies">
            <span
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Most Active Companies
            </span>
          </Link> */}
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
