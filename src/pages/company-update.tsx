import { FC } from "react";
import { Row, Col, Form, Input, message, Button } from "antd";
import axios from "axios";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const CompanyUpdate: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams<{ id: string }>();
  const getCompanyAgent = async () => {
    // TODO: company agent company ile gelmiyor
    const response = await axios.get(
      `http://localhost:3000/company-agent/${id}`
    );
    return response.data;
  };
  const { data } = useQuery("companyAgent", getCompanyAgent);
  const companyAgent = data?.companyAgent;
  const company = companyAgent?.company;

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

    try {
      const response = await axios.patch(
        `http://localhost:3000/company/${company.id}`,
        {
          name,
          mail,
          phoneNum,
          description,
          address,
          country,
          employeeNum,
          sector,
        }
      );
      messageApi.open({
        type: "success",
        content: "Company Updated",
      });
      console.log(response.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Company Update Failed",
      });
    }
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
              <Input placeholder={company.name} />
            </Form.Item>
            <Form.Item label="Mail" name="mail">
              <Input placeholder={company.mail} />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNum">
              <Input placeholder={company.phoneNum} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input placeholder={company.description} />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input placeholder={company.address} />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Input placeholder={company.country} />
            </Form.Item>
            <Form.Item label="Employee Number" name="employeeNum">
              <Input placeholder={company.employeeNum} />
            </Form.Item>
            <Form.Item label="Sector" name="sector">
              <Input placeholder={company.sector} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Company
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CompanyUpdate;
