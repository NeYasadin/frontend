import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Col, Row } from "antd";

const CompanyAgentDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const getCompanyAgent = async () => {
    const response = await axios.get(
      `http://localhost:3000/company-agent/${id}`
    );
    return response.data;
  };
  const { data } = useQuery("companyAgent", getCompanyAgent);
  const companyAgent = data?.companyAgent;

  return (
    <Row>
      <Col xs={24}>
        <CompanyAgentNavbar companyAgentId={parseInt(id)} />
      </Col>
      <Col xs={24}>
        <Row justify={"center"} gutter={[16, 16]} style={{ padding: "30px" }}>
          <Col xs={24}>
            <span style={{ fontSize: "24px" }}>Account Details</span>
          </Col>
          <Col xs={24}>
            <span style={{ fontSize: "18px" }}>
              Company Agent Name: {companyAgent?.name}
            </span>
          </Col>
          <Col xs={24}>
            <span style={{ fontSize: "18px" }}>
              Company Agent Email: {companyAgent?.mail}
            </span>
          </Col>
          <Col xs={24}>
            <span style={{ fontSize: "18px" }}>
              Company Agent Company: {companyAgent?.company.name}
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CompanyAgentDetails;
