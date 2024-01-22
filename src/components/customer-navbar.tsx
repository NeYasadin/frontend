import { Row, Col, Menu } from "antd";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";

type Props = {
  customerId: number;
};

const CustomerNavbar: FC<Props> = ({ customerId }) => {
  const history = useHistory();
  const items = [
    {
        label: "Create Complaint",
        key: "create-complaint",
    },
    {
      label: "My Complaints",
      key: "my-complaint",

    },
    {
        label: "Top 5 Customer",
        key: "top-5-customer",
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
    if (key == "top-5-customer") {
      history.push(`/customer-info/top-5-customer/${customerId}`);
    }
    if (key == "create-complaint") {
      history.push(`/customer-complaint/creation/${customerId}`);
    }
    if (key == "my-complaint") {
      history.push(`/customer-info/mycomplaints/${customerId}`);
    }
    if (key == "account-details") {
      history.push(`/customer-info/detail/${customerId}`);
    }
    if (key == "update-account") {
      history.push(`/customer-info/update/${customerId}`);
    }
  };

  return (
    <Row
      style={{ background: "#C8A2C8", height: "10vh" }}
      gutter={[16, 16]}
      align={"middle"}
      justify={"center"}
    >
      <Col xs={8}>
        <Link
          to={`/customer/${customerId}`}
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

export default CustomerNavbar;
