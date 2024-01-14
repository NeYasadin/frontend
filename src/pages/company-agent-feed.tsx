import { Card, Row, Col } from "antd"; // Replace with your card component library
import { FC } from "react";
import { Complaint } from "../interfaces/models";

type Props = {
  complaints: Complaint[];
};

const CompanyAgentFeed: FC<Props> = ({ complaints }) => {
  return (
    <Row>
      {complaints.map((complaint: Complaint, index: number) => (
        <Col xs={24} style={{ padding: "30px" }}>
          <Row align={"middle"} justify={"center"}>
            <Col xs={8}>
              <Card key={index}>
                <div>{complaint.content}</div>
              </Card>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default CompanyAgentFeed;
