import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CustomerNavbar from "../components/customer-navbar";
import { Col, Row } from "antd";

const CustomerDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const getCustomer = async () => {
    const response = await axios.get(
      `http://localhost:3000/customer/${id}`
    );
    return response.data;
  };
  const { data } = useQuery("customer", getCustomer);
  const customer = data?.customer;

  return (
    <Row>
      <Col xs={24}>
        <CustomerNavbar customerId={parseInt(id)} />
      </Col>
      <Col xs={24}>
        <Row justify={"center"} gutter={[16, 16]} style={{ padding: "30px" }}>
          <Col xs={24}>
            <span style={{ fontSize: "24px" }}>Account Details</span>
          </Col>
          <Col xs={24}>
            <span style={{ fontSize: "18px" }}>
              Customer: {customer?.name}
            </span>
          </Col>
          <Col xs={24}>
            <span style={{ fontSize: "18px" }}>
              Customer Email: {customer?.mail}
            </span>
          </Col>
          <Col xs={24}>
            <span style={{ fontSize: "18px" }}>
              Customer Phone Number: {customer?.phoneNum}
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CustomerDetails;
