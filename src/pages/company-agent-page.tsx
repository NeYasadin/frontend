import { FC } from "react";
import { useParams } from "react-router-dom";
import CompanyAgentFeed from "../components/company-agent-feed";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Row, Col } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const CompanyAgentPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/company-agent/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const response = await axios.get("http://localhost:3000/company-agent/", {
      params: { id },
    });
    return response.data;
  };

  const { data: companyAgentData } = useQuery("companyAgent", fetchData);
  const companyAgent = companyAgentData?.companyAgent;

  const fetchDataComplaints = async () => {
    const response = await axios.get("http://localhost:3000/complaint/", {
      params: { companyId: companyAgent?.companyId },
    });
    return response.data;
  };
  const { data: complaintsData } = useQuery("complaints", fetchDataComplaints, {
    enabled: !!companyAgent,
  });
  const complaints = complaintsData?.complaints;
  return (
    <Row>
      <Col xs={24}>
        <CompanyAgentNavbar companyAgentId={parseInt(id)} />
      </Col>
      <Col xs={24}>
        <CompanyAgentFeed
          complaints={complaints}
          companyAgentId={parseInt(id)}
        />
      </Col>
    </Row>
  );
};

export default CompanyAgentPage;
