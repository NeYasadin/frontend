import { FC } from "react";
import { useParams } from "react-router-dom";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Row, Col, Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { Company } from "../interfaces/models";

const CompanyAgentUpdate: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  const getCompanyAgent = async () => {
    const response = await axios.get(
      `http://localhost:3000/company-agent/${id}`
    );
    return response.data;
  };
  const { data: companyAgentData } = useQuery("companyAgent", getCompanyAgent);
  const companyAgent = companyAgentData?.companyAgent;

  const getCompanies = async () => {
    const response = await axios.get("http://localhost:3000/company/");
    return response.data;
  };

  const { data: companiesData, isLoading: loading } = useQuery(
    "companies",
    getCompanies
  );
  const companies = companiesData?.companies;

  const onFinish = async (values: {
    name: string;
    mail: string;
    password: string;
    companyId: string;
  }) => {
    const { name, mail, password, companyId } = values;
    const response = await axios.patch(
      `http://localhost:3000/company-agent/${id}`,
      {
        name,
        mail,
        password,
        companyId,
      }
    );
    messageApi.open({
      type: "success",
      content: "Company Agent Updated",
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
              <Input placeholder={companyAgent.name} />
            </Form.Item>
            <Form.Item label="Mail" name="mail">
              <Input placeholder={companyAgent.mail} />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder={companyAgent.password} />
            </Form.Item>
            <Form.Item label="Company" name="companyId">
              <Select
                placeholder={companyAgent.company.name}
                defaultValue={companyAgent.company.id}
              >
                {loading === false &&
                  companies.map((company: Company) => (
                    <Select.Option key={company.id} value={company.id}>
                      {company.name}
                    </Select.Option>
                  ))}
                <Select.Option key="noCompany" value={0}>
                  No Company
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CompanyAgentUpdate;
