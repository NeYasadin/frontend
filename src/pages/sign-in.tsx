import { useState, FC } from "react";
import { Form, Input, Button, Tabs, Row, Col, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import TabPane from "antd/es/tabs/TabPane";

const SignIn: FC = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("Customer");
  const [messageApi, contextHolder] = message.useMessage();

  const onFinishCustomer = async (values: {
    emailCustomer: string;
    passwordCustomer: string;
  }) => {
    const { emailCustomer, passwordCustomer } = values;

    const { data: customerData } = await axios.get(
      "http://localhost:3000/customer/authenticate",
      { params: { mail: emailCustomer, password: passwordCustomer } }
    );

    if (customerData.customer) {
      // Go to customer page with that id.
    } else {
      messageApi.open({
        type: "error",
        content: "Invalid email or password",
      });
    }
  };

  const onFinishCompanyAgent = async (values: {
    emailCompanyAgent: string;
    passwordCompanyAgent: string;
  }) => {
    const { emailCompanyAgent, passwordCompanyAgent } = values;

    const { data: companyAgentData } = await axios.get(
      "http://localhost:3000/company-agent/authenticate",
      { params: { mail: emailCompanyAgent, password: passwordCompanyAgent } }
    );

    console.log(companyAgentData.companyAgent);
    if (companyAgentData.companyAgent) {
      history.push(`/company-agent/${companyAgentData.companyAgent.id}`);
    } else {
      messageApi.open({
        type: "error",
        content: "Invalid email or password",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row style={{ padding: "30px", height: "100vh" }}>
        <Col xs={24}>
          <Link to="/">
            <Button>
              <LeftOutlined />
              <span>Back</span>
            </Button>
          </Link>
        </Col>
        <Col xs={5}>
          <Tabs
            activeKey={activeTab}
            onChange={(activeKey) => setActiveTab(activeKey)}
          >
            <TabPane tab="Customer" key="Customer">
              <Form onFinish={onFinishCustomer}>
                <Form.Item
                  name="emailCustomer"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="passwordCustomer"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Company Agent" key="CompanyAgent">
              <Form onFinish={onFinishCompanyAgent}>
                <Form.Item
                  name="emailCompanyAgent"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="passwordCompanyAgent"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
