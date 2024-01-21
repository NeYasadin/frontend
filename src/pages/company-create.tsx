import { FC } from "react";
import { Row, Col, Form, Input, message, Button } from "antd";
import axios from "axios";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { useParams } from "react-router-dom";

const CompanyCreate: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams<{ id: string }>();
  const onFinish = async (values: {
    name: string;
    mail: string;
    phoneNum: string;
    description: string;
    address: string;
    country: string;
    employeeNum: string;
    sector: string;
  }) => {
    const {
      name,
      mail,
      phoneNum,
      description,
      address,
      country,
      employeeNum,
      sector,
    } = values;
    const response = await axios.post(`http://localhost:3000/company/`, {
      name,
      mail,
      phoneNum,
      description,
      address,
      country,
      employeeNum,
      sector,
    });

    messageApi.open({
      type: "success",
      content: "Company Created",
    });
    console.log(response.data);
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col xs={24}>
          <CompanyAgentNavbar companyAgentId={parseInt(id)} />
        </Col>
        <Col xs={8} style={{ padding: "30px" }}>
          <Form onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Mail" name="mail">
              <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNum">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>
            <Form.Item label="Employee Number" name="employeeNum">
              <Input />
            </Form.Item>
            <Form.Item label="Sector" name="sector">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Company
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CompanyCreate;
