import { FC } from "react";
import { Button, Col, Layout, Row, Spin, Table } from "antd";
import LandingNavbar from "./landing-navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const AvgSolutionRating: FC = () => {
  const { Content } = Layout;
  const getMostActiveCompanies = async () => {
    const response = await axios.get(
      `http://localhost:3000/company/highest-rated-company`
    );

    return response.data;
  };
  const { data, isLoading } = useQuery(
    "highestRatingCompanies",
    getMostActiveCompanies
  );
  const mostRatedCompanies = data?.highestRatedCompanies.map(
    (company: any) => ({
      ...company,
      avg_solution_rating: parseFloat(company.avg_solution_rating).toFixed(2),
    })
  );

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Average Solutions Rating",
      dataIndex: "avg_solution_rating",
      key: "avg_solution_rating",
    },
  ];
  return (
    <Layout style={{ margin: "0px", padding: "0px" }}>
      <LandingNavbar />
      <Content style={{ padding: "30px" }}>
        <Row justify={"space-between"} align={"middle"}>
          <Col xs={16} style={{ paddingBottom: "40px" }}>
            <span style={{ fontSize: "24px" }}>
              Companies that subscribe and have the highest solution average
              with more than 5 solutions
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
              <Table columns={columns} dataSource={mostRatedCompanies} />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AvgSolutionRating;
