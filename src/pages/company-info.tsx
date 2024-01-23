import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Card, Col, Row, Table } from "antd";
import imagecompany from "../assets/company.png";

const CompanyInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const getCompanyByAgentId = async () => {
    const response = await axios.get(
      `http://localhost:3000/company-agent/company`,
      { params: { id: parseInt(id) } }
    );
    return response.data;
  };
  const { data } = useQuery("company", getCompanyByAgentId);
  const company = data?.company[0];

  const getactivefivecompanyagent = async () => {
    const response = await axios.get(
      `http://localhost:3000/company/active-company-agents`,
      { params: { id: parseInt(id) } }
    );
    return response.data;
  };
  const { data: datas } = useQuery("companyagents", getactivefivecompanyagent);
  const companyagent = datas?.activeCompanyAgents;
  console.log(companyagent);

  const columns = [
    {
      title: "Comapny Agent Name",
      dataIndex: "name",
      key: "customerName",
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Comapny Agent ID",
      dataIndex: "company_agent_id",
      key: "customer_agent_id",
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Total Solutions Solved",
      dataIndex: "total_solutions_solved",
      key: "total_solutions_solved",
      sorter: (a: any, b: any) => a.meTooCount - b.meTooCount,
    },
  ];

  return (
    <>
      <Row>
        <Col xs={24}>
          <CompanyAgentNavbar companyAgentId={parseInt(id)} />
        </Col>
      </Row>
      <Row gutter={16} style={{ padding: "30px" }}>
        <Col xs={24} md={16}>
          <Card title="Company Details" bordered={false}>
            <p style={{ fontSize: "20px" }}>Name: {company?.name}</p>
            <p style={{ fontSize: "20px" }}>Email: {company?.mail}</p>
            <p style={{ fontSize: "20px" }}>Phone: {company?.phoneNum}</p>
            <p style={{ fontSize: "20px" }}>
              Description: {company?.description}
            </p>
            <p style={{ fontSize: "20px" }}>Sector: {company?.sector}</p>
            <p style={{ fontSize: "20px" }}>Country: {company?.country}</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <img
            src={imagecompany}
            alt="Company"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "20%",
            }}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ padding: "30px" }}>
        <Col xs={24}>
          <span style={{ fontSize: "24px" }}>Active Company Agents </span>
        </Col>
      </Row>
      <Row gutter={16} style={{ padding: "30px" }}>
        <Table columns={columns} dataSource={companyagent} />
      </Row>
    </>
  );
};

export default CompanyInfo;
