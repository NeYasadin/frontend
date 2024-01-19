import React, { useEffect, useState } from "react";
import { Tabs, Input, Button, Select, Row, Col, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Company } from "../interfaces/models";
import "./general.css";

const { TabPane } = Tabs;
const { Option } = Select;

const SignUp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyId, setCompanyId] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/company/");
        setCompanies(response.data.companies);
        console.log(response.data.companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleCompanyChange = (value: number) => {
    setCompanyId(value);
  };

  const handleSignUpCustomer = async () => {
    const obj = {
      name,
      mail,
      password,
      phoneNum: phoneNumber,
    };

    try {
      const response = await axios.post("http://localhost:3000/customer/", obj);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUpCompanyAgent = async () => {
    const obj = {
      name,
      mail,
      password,
      companyId: companyId === 0 ? null : companyId,
    };

    try {
      // Get company by its name.
      const response = await axios.post(
        "http://localhost:3000/company-agent/",
        obj
      );
      messageApi.open({
        type: "success",
        content: "Successfully signed up!",
      });
      setTimeout(() => {
        history.push(`/signin`);
      }, 2500);
      console.log(response);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Successfully signed up!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row style={{ padding: "30px", height: "100vh" }}>
        <Col xs={24}>
          <Row justify={"end"}>
            <Col>
              <Link to="/">
                <Button>
                  <LeftOutlined />
                  <span>Back</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Customer" key="customer">
              <Col className="p-20">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </Col>
              <Col className="p-20">
                <Input
                  placeholder="Email"
                  value={mail}
                  onChange={handleEmailChange}
                />
              </Col>
              <Col className="p-20">
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Col>
              <Col className="p-20">
                <Input
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Col>
            </TabPane>
            <TabPane tab="Company Agent" key="companyAgent">
              <Col className="p-20">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </Col>
              <Col className="p-20">
                <Input
                  placeholder="Email"
                  value={mail}
                  onChange={handleEmailChange}
                />
              </Col>
              <Col className="p-20">
                <Input.Password
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Col>
              <Col className="p-20" xs={24}>
                <Select
                  placeholder="No Company"
                  onChange={handleCompanyChange}
                  style={{ width: "100%" }}
                >
                  {loading === false &&
                    companies.map((company) => (
                      <Option key={company.id} value={company.id}>
                        {company.name}
                      </Option>
                    ))}
                  <Option key="noCompany" value={0}>
                    No Company
                  </Option>
                </Select>
              </Col>
            </TabPane>
          </Tabs>
        </Col>
        <Col xs={24}>
          <Button
            type="primary"
            onClick={
              activeTab === "customer"
                ? handleSignUpCustomer
                : handleSignUpCompanyAgent
            }
          >
            Sign Up
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
