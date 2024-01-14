import { Row, Col } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  companyAgentId: number;
};

const CompanyAgentNavbar: FC<Props> = ({ companyAgentId }) => {
  return (
    <Row
      style={{ background: "#5C5AD1", height: "10vh" }}
      gutter={[16, 16]}
      align={"middle"}
    >
      <Col xs={8}>
        <Link
          to={`/company-agent/${companyAgentId}`}
          style={{ color: "white", padding: "20px" }}
        >
          <span style={{ fontWeight: 600, fontSize: "24px" }}>Home</span>
        </Link>
      </Col>
      <Col xs={16}>
        <Row justify={"end"} gutter={[16, 16]}>
          <Col>
            <Link
              to="/company-agent/details/:id"
              style={{ color: "white", padding: "20px" }}
            >
              <span style={{ fontWeight: 600, fontSize: "24px" }}>
                Account Details
              </span>
            </Link>
          </Col>
          <Col>
            <Link to="/" style={{ color: "white", padding: "20px" }}>
              <span style={{ fontWeight: 600, fontSize: "24px" }}>Exit</span>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CompanyAgentNavbar;
