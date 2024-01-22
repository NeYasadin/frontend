import { FC } from "react";
import { useParams } from "react-router-dom";
import CustomerNavbar from "../components/customer-navbar";
import { Row, Col, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const CustomerUpdate: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  const getCustomer = async () => {
    const response = await axios.get(
      `http://localhost:3000/custoemr/${id}`
    );
    return response.data;
  };
  const { data: customerData } = useQuery("customer", getCustomer);
  const customer = customerData?.customer;

  const onFinish = async (values: {
    name: string;
    mail: string;
    password: string;
    companyId: string;
  }) => {
    const { name, mail, password} = values;
    const response = await axios.patch(
      `http://localhost:3000/customer/${id}`,
      {
        name,
        mail,
        password,
      }
    );
    messageApi.open({
      type: "success",
      content: "Customer Updated",
    });
    console.log(response.data);
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col xs={24}>
          <CustomerNavbar customerId={parseInt(id)} />
        </Col>
        <Col xs={8} style={{ padding: "30px" }}>
          <Form onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input placeholder={customer.name} />
            </Form.Item>
            <Form.Item label="Mail" name="mail">
              <Input placeholder={customer.mail} />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder={customer.password} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CustomerUpdate;
