import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyAgentFeed from "../components/company-agent-feed";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Row, Col, Pagination } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const CompanyAgentPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);

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
      params: { companyId: companyAgent?.companyId, page, pageSize },
    });
    return response.data;
  };
  const { data: complaintsData, refetch } = useQuery(
    "complaints",
    fetchDataComplaints,
    {
      enabled: !!companyAgent,
    }
  );
  const complaints = complaintsData?.complaints;

  useEffect(() => {
    refetch();
  }, [page, pageSize]);

  return (
    <Row>
      <Col xs={24}>
        <CompanyAgentNavbar companyAgentId={parseInt(id)} />
      </Col>
      <Col xs={24} style={{ padding: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            defaultPageSize={3}
            pageSizeOptions={["3", "5"]}
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            total={complaintsData?.count}
            showSizeChanger={true}
          />
        </div>
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
