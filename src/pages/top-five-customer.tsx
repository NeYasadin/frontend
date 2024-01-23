import { FC } from "react";
import { useParams } from "react-router-dom";
import CustomerNavbar from "../components/customer-navbar";
import { Row, Col, Table } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const TopFiveCustomer: FC = () => {
  const { id } = useParams<{ id: string }>();

  const fetchDataCustomer = async () => {
    const response = await axios.get(
      "http://localhost:3000/complaint/me-too-customer"
    );
    console.log(response.data);
    return response.data;
  };

  const { data: meTooData } = useQuery(
    "meTooCountByCustomer",
    fetchDataCustomer
  );
  const tableData = meTooData?.complaints;
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "customerName",
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "Complaint Count",
      dataIndex: "meTooCount",
      key: "complaintCount",
      sorter: (a: any, b: any) => a.meTooCount - b.meTooCount,
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <CustomerNavbar customerId={parseInt(id)} />
      </Col>
      <Col span={24}>
        <span style={{ fontSize: "24px" }}>Top Five Customer</span>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={tableData} />
      </Col>
    </Row>
  );
};

export default TopFiveCustomer;
