import { Row, Col } from "antd"; // Replace with your card component library
import { FC } from "react";
import { Complaint } from "../interfaces/models";
import CustomerComplaintCard from "../pages/customer-complaint-card";

type Props = {
  complaints: Complaint[];
  customerId: number;
};

const CustomerFeed: FC<Props> = ({ complaints, customerId }) => {
  return (
    <Row>
      {complaints?.map((complaint: Complaint) => (
        <Col xs={24} style={{ padding: "30px" }}>
          <Row align={"middle"} justify={"center"}>
            <Col xs={8}>
              <CustomerComplaintCard
                complaint={complaint}
                customerId={customerId}
              />
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default CustomerFeed;
