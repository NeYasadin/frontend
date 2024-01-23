import { FC } from "react";
import { useParams } from "react-router-dom";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Row, Col, Table } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const SuccessfulAgents: FC = () => {
  const { id } = useParams<{ id: string }>();

  const fetchDataCompanyAgents = async () => {
    const response = await axios.get(
      "http://localhost:3000/company/resolved-all-complaints"
    );
    console.log(response.data);
    return response.data;
  };

  const { data: meTooData } = useQuery(
    "companiesResolvedAllComplaints",
    fetchDataCompanyAgents
  );
  const tableData = meTooData?.companiesResolvedAllComplaints;
  console.log(tableData);
  const columns = [
    {
      title: "Customer Agent Name",
      dataIndex: "companyAgentName",
      key: "companyAgentName",
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
  ];

  return (
    <Row>
      <Col span={24} style={{ marginBottom: "20px" }}>
        <CompanyAgentNavbar companyAgentId={parseInt(id)} />
      </Col>
      <Col span={24} style={{ marginBottom: "20px" }}>
        {" "}
        <span style={{ fontSize: "24px" }}>
          Agents who Solve All Complaints About the Company
        </span>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={tableData} />
      </Col>
    </Row>
  );
};

export default SuccessfulAgents;
