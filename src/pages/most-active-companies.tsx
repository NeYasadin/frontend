import { FC } from "react";
import { Button, Col, Layout, Row, Spin, Table } from "antd";
import LandingNavbar from "./landing-navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const MostActiveCompanies: FC = () => {
  const { Content } = Layout;
  const getMostActiveCompanies = async () => {
    const response = await axios.get(
      `http://localhost:3000/company/active-company`
    );
    console.log(response.data);
    return response.data;
  };
  const { data, isLoading } = useQuery(
    "mostActiveCompanies",
    getMostActiveCompanies
  );
  const mostActiveCompanies = data?.activeCompanies;

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Total Solutions Solved",
      dataIndex: "total_solutions_solved",
      key: "total_solutions_solved",
    },
  ];
  return (
    <Layout style={{ margin: "0px", padding: "0px" }}>
      <LandingNavbar />
      <Content style={{ padding: "30px" }}>
        <Row justify={"space-between"} align={"middle"}>
          <Col xs={16} style={{ paddingBottom: "40px" }}>
            <span style={{ fontSize: "24px" }}>Most Active Companies</span>
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
              <Table columns={columns} dataSource={mostActiveCompanies} />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MostActiveCompanies;
