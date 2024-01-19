import { Row, Col } from "antd"; // Replace with your card component library
import { FC } from "react";
import { Complaint } from "../interfaces/models";
import ComplaintCard from "../pages/complaint-card";

type Props = {
  complaints: Complaint[];
  companyAgentId: number;
};

const CompanyAgentFeed: FC<Props> = ({ complaints, companyAgentId }) => {
  return (
    <Row>
      {complaints?.map((complaint: Complaint) => (
        <Col xs={24} style={{ padding: "30px" }}>
          <Row align={"middle"} justify={"center"}>
            <Col xs={8}>
              <ComplaintCard
                complaint={complaint}
                companyAgentId={companyAgentId}
              />
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default CompanyAgentFeed;
