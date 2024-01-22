import { FC } from "react";
import { useParams } from "react-router-dom";
import CustomerFeed from "../components/customer-feed";
import CustomerNavbar from "../components/customer-navbar";
import { Row, Col } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const MyComplaints: FC = () => {
  const { id } = useParams<{ id: string }>();
  const customerId = parseInt(id);

  const fetchDataComplaints = async () => {
    const response = await axios.get("http://localhost:3000/complaint/", {
      params: { customerId: customerId },
    });
    return response.data;
  };
  const { data: complaintsData } = useQuery("complaints", fetchDataComplaints, {
  });
  const complaints = complaintsData?.complaints;
  return (
    <Row>
      <Col xs={24}>
        <CustomerNavbar customerId={customerId} />
      </Col>
      <Col xs={24}>
        <CustomerFeed
          complaints={complaints}
          customerId={customerId}
        />
      </Col>
    </Row>
  );
};

export default MyComplaints;
