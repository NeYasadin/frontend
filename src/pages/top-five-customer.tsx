import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerNavbar from "../components/customer-navbar";
import { Row, Col, Table } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const TopFiveCustomer: FC = () => {
      
  const { id } = useParams<{ id: string }>();

  const fetchDataCustomer = async () => {
    const response = await axios.get("http://localhost:3000/complaint/me-too-customer");
    console.log(response.data);
    return response.data;
  };

  const { data: meTooData } = useQuery("meTooCountByCustomer", fetchDataCustomer);

  return (
    <Row>
        <Col span={24}>
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>Top 5 Customers</span>
            <span>
            {meTooData }
             </span>
        </Col>
    </Row>
  );
};

export default TopFiveCustomer;
