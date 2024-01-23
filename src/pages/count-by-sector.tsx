import { FC } from "react";
import { Button, Col, Layout, Row, Spin, Table } from "antd";
import LandingNavbar from "./landing-navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const CountBySector: FC = () => {
  const { Content } = Layout;
  const getCount = async () => {
    const response = await axios.get(
      `http://localhost:3000/complaint/count-by-sector`
    );
    console.log(response.data);

    return response.data;
  };
  const { data, isLoading } = useQuery("countbysector", getCount);
  const countbysector = data?.complaints;

  const columns = [
    {
      title: "Company Sector",
      dataIndex: "sector",
      key: "sector",
    },
    {
      title: "Complaint Count",
      dataIndex: "count",
      key: "count",
    },
  ];
  return (
    <Layout style={{ margin: "0px", padding: "0px" }}>
      <LandingNavbar />
      <Content style={{ padding: "30px" }}>
        <Row justify={"space-between"} align={"middle"}>
          <Col xs={16} style={{ paddingBottom: "40px" }}>
            <span style={{ fontSize: "24px" }}>
              Sectors with the Most Complaints
            </span>
          </Col>
          <Col xs={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <Button>
                  <LeftOutlined />
                  <span>Back</span>
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24}>
            {isLoading ? (
              <Spin />
            ) : (
              <Table columns={columns} dataSource={countbysector} />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CountBySector;
