import { Row, Col, Menu } from "antd";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";

type Props = {
  companyAgentId: number;
};

const CompanyAgentNavbar: FC<Props> = ({ companyAgentId }) => {
  const history = useHistory();
  const items = [
    {
      label: "Company",
      key: "company",
      children: [
        {
          label: "Create Company",
          key: "create-company",
          to: "/company-agent/create-company",
        },
        {
          label: "Update Company",
          key: "update-company",
          to: "/company-agent/update-company",
        },
        {
          label: "Subscription",
          key: "subscription",
          to: "/company-agent/subscription",
        },
      ],
    },
    {
      label: "Account",
      key: "account",
      children: [
        {
          label: "Account Details",
          key: "account-details",
          to: "/company-agent/account-details",
        },
        {
          label: "Update Account",
          key: "update-account",
          to: "/company-agent/update-account",
        },
      ],
    },
    {
      label: "Exit",
      key: "exit",
      to: "/",
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    // check keys and redirect.
    if (key == "exit") {
      history.push("/");
    }
    if (key == "create-company") {
      history.push("/company-agent/create-company/" + companyAgentId);
    }
    if (key == "update-company") {
      history.push("/company-agent/update-company");
    }
    if (key == "subscription") {
      history.push("/company-agent/subscription");
    }
    if (key == "account-details") {
      history.push(`/company-agent/details/${companyAgentId}`);
    }
    if (key == "update-account") {
      console.log(`/company-agent/update/${companyAgentId}`);
      history.push(`/company-agent/update/${companyAgentId}`);
    }
  };

  return (
    <Row
      style={{ background: "#5C5AD1", height: "10vh" }}
      gutter={[16, 16]}
      align={"middle"}
      justify={"center"}
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
        <Row justify={"center"} align={"middle"} gutter={[16, 16]}>
          <Col xs={24}>
            <div style={{ justifyContent: "end", alignContent: "middle" }}>
              <Menu
                onClick={onClick}
                // selectedKeys={[current]}
                mode="horizontal"
                items={items}
                style={{
                  background: "#5C5AD1",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 600,
                  justifyContent: "end",
                  height: "10vh",
                  alignContent: "middle",
                }}
              ></Menu>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CompanyAgentNavbar;
