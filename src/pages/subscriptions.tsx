import { Col, Row, Spin } from "antd";
import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Subscription } from "../interfaces/models";

const Subscriptions: FC = () => {
  const { id } = useParams<{ id: string }>();
  const getCompanyAgent = async () => {
    const response = await axios.get(
      `http://localhost:3000/company-agent/${id}`
    );
    return response.data;
  };
  const { data, isLoading: isLoadingCompanyAgent } = useQuery(
    "companyAgent",
    getCompanyAgent
  );
  const companyAgent = data?.companyAgent;
  console.log(companyAgent);

  const getSubscriptions = async () => {
    const response = await axios.get("http://localhost:3000/subscription/", {
      params: { companyId: companyAgent?.companyId },
    });
    console.log(response.data);
    return response.data;
  };
  const { data: subscriptionsData, isLoading } = useQuery(
    "subscriptions",
    getSubscriptions,
    {
      enabled: !!companyAgent,
    }
  );
  const subscriptions = subscriptionsData?.subscription;
  console.log(subscriptions);
  return (
    <>
      {isLoadingCompanyAgent || isLoading ? (
        <Spin />
      ) : (
        <Row>
          <Col xs={24}>
            <CompanyAgentNavbar companyAgentId={parseInt(id)} />
          </Col>
          <Col>
            {subscriptions?.map((subscription: Subscription) => (
              <Row
                justify={"center"}
                gutter={[16, 16]}
                style={{ padding: "30px" }}
              >
                <Col xs={24}>
                  <span style={{ fontSize: "24px" }}>Subscription Details</span>
                </Col>
                <Col xs={24}>
                  <span style={{ fontSize: "18px" }}>
                    Start Date: {subscription?.startDate}
                  </span>
                </Col>
                <Col xs={24}>
                  <span style={{ fontSize: "18px" }}>
                    End Date: {subscription?.endDate}
                  </span>
                </Col>
                <Col xs={24}>
                  <span style={{ fontSize: "18px" }}>
                    Period: {subscription?.period}
                  </span>
                </Col>
                <Col xs={24}>
                  <span style={{ fontSize: "18px" }}>
                    Price: {subscription?.price}
                  </span>
                </Col>
                <Col xs={24}>
                  <span style={{ fontSize: "18px" }}>
                    Payment Type: {subscription?.paymentType}
                  </span>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Subscriptions;
