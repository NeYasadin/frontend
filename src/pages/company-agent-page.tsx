import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyAgentFeed from "./company-agent-feed";
import CompanyAgentNavbar from "./company-agent-navbar";
import { Row, Col } from "antd";
import axios from "axios";
import { CompanyAgent, Complaint } from "../interfaces/models";

const CompanyAgentPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [companyAgent, setCompanyAgent] = useState<CompanyAgent>();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/company-agent/", {
        params: { id },
      });
      setCompanyAgent(data.companyAgent);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/complaint/", {
        params: { companyId: companyAgent?.companyId },
      });
      setComplaints(data.complaints);
    };
    fetchData();
  }, [companyAgent]);

  return (
    <Row>
      <Col xs={24}>
        <CompanyAgentNavbar companyAgentId={parseInt(id)} />
      </Col>
      <Col xs={24}>
        <CompanyAgentFeed complaints={complaints} />
      </Col>
    </Row>
  );
};

export default CompanyAgentPage;
