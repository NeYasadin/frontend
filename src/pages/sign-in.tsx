import React from "react";
import { Form, Input, Button } from "antd";

const SignIn: React.FC = () => {
  const onFinish = (values: { email: string; password: string }) => {
    console.log("Received values:", values);
    // Add your sign-in logic here
  };

  return (
    <>
      <h1>NeYaşadın?</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;
