import { FC } from "react";
import { Button, Col, Layout, Row, Spin, Table } from "antd";
import LandingNavbar from "./landing-navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const MostSolvedComplaints: FC = () => {
  const { Content } = Layout;
  const getMostSolutionWrittenCompanies = async () => {
    const response = await axios.get(
      `http://localhost:3000/company/most-solutions`
    );
    console.log(response.data);
    return response.data;
  };
  const { data, isLoading } = useQuery(
    "highestsolvingwrittenCompanies",
    getMostSolutionWrittenCompanies
  );
  const mostWrittenCompanies = data?.mostSolutionsWrittenByCompany;
  console.log(mostWrittenCompanies);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Solution Count",
      dataIndex: "solutionCount",
      key: "solutionCount",
    },
  ];
  return (
    <Layout style={{ margin: "0px", padding: "0px" }}>
      <LandingNavbar />
      <Content style={{ padding: "30px" }}>
        <Row justify={"space-between"} align={"middle"}>
          <Col xs={16} style={{ paddingBottom: "40px" }}>
            <span style={{ fontSize: "24px" }}>
              Companies that Solve the Most Complaints of All Time
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
              <Table columns={columns} dataSource={mostWrittenCompanies} />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MostSolvedComplaints;
