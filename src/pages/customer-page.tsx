import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerFeed from "../components/customer-feed";
import CustomerNavbar from "../components/customer-navbar";
import { Row, Col, Pagination } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const CustomerPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/customer/${id}`);
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
      params: { page, pageSize },
    });
    console.log("response:" + response.data);
    return response.data;
  };
  const { data: complaintsData, refetch } = useQuery(
    "complaints",
    fetchDataComplaints,
    {
      enabled: !!customer,
    }
  );
  const complaints = complaintsData?.complaints;

  useEffect(() => {
    refetch();
  }, [page, pageSize]);

  return (
    <Row>
      <Col xs={24}>
        <CustomerNavbar customerId={parseInt(id)} />
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
        <CustomerFeed complaints={complaints} customerId={parseInt(id)} />
      </Col>
    </Row>
  );
};

export default CustomerPage;
