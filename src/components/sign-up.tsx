import React, { useState } from "react";
import { Tabs, Input, Button, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;

const SignUp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleCompanyChange = (value: string) => {
    setCompany(value);
  };

  const handleSignUp = () => {
    // Perform sign up logic here
  };

  return (
    <div>
      <Link to="/">
        <Button>
          <LeftOutlined />
          <span>Back</span>
        </Button>
      </Link>
      <h1>NeYaşadın?</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Customer" key="customer">
          <Input placeholder="Name" value={name} onChange={handleNameChange} />
          <Input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </TabPane>
        <TabPane tab="Company Agent" key="companyAgent">
          <Input placeholder="Name" value={name} onChange={handleNameChange} />
          <Input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Select
            placeholder="Company"
            value={company}
            onChange={handleCompanyChange}
          >
            <Option value="company1">Company 1</Option>
            <Option value="company2">Company 2</Option>
            <Option value="company3">Company 3</Option>
          </Select>
        </TabPane>
      </Tabs>
      <Button type="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
