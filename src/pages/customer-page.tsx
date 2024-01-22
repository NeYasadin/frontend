import { FC } from "react";
import { useParams } from "react-router-dom";
import CustomerFeed from "../components/customer-feed";
import CustomerNavbar from "../components/customer-navbar";
import { Row, Col } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const CustomerPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/customer/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const response = await axios.get("http://localhost:3000/customer/", {
      params: { id },
    });
    return response.data;
  };

  const { data: customerData } = useQuery("customer", fetchData);
  const customer = customerData?.customer;

  const fetchDataComplaints = async () => {
    const response = await axios.get("http://localhost:3000/complaint/", {
    });
    return response.data;
  };
  const { data: complaintsData } = useQuery("complaints", fetchDataComplaints, {
    enabled: !!customer,
  });
  const complaints = complaintsData?.complaints;
  return (
    <Row>
      <Col xs={24}>
        <CustomerNavbar customerId={parseInt(id)} />
      </Col>
      <Col xs={24}>
        <CustomerFeed
          complaints={complaints}
          customerId={parseInt(id)}
        />
      </Col>
    </Row>
  );
};

export default CustomerPage;
