import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  message,
} from "antd";
import { FC } from "react";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const SubscriptionCreate: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  const getCompanyAgent = async () => {
    const response = await axios.get(
      `http://localhost:3000/company-agent/${id}`
    );
    return response.data;
  };
  const { data, isLoading } = useQuery("companyAgent", getCompanyAgent);
  const companyAgent = data?.companyAgent;

  const onFinish = async (values: {
    startDate: string;
    endDate: string;
    period: string;
    price: string;
    paymentType: string;
  }) => {
    const { startDate, endDate, period, price, paymentType } = values;
    try {
      const response = await axios.post(`http://localhost:3000/subscription/`, {
        startDate,
        endDate,
        period,
        price,
        paymentType,
        companyId: companyAgent.companyId,
        isPaid: false,
      });

      messageApi.open({
        type: "success",
        content: "Subscription Created",
      });
      console.log(response.data);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Subscription could not be created",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col xs={24}>
          <CompanyAgentNavbar companyAgentId={parseInt(id)} />
        </Col>
        {isLoading ? (
          <Spin />
        ) : (
          <Col xs={8} style={{ padding: "30px" }}>
            <Form onFinish={onFinish}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker />
              </Form.Item>
              <Form.Item label="End Date" name="endDate">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Period" name="period">
                <Select>
                  <Select.Option value="MONTHLY">Monthly</Select.Option>
                  <Select.Option value="YEARLY">Yearly</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input />
              </Form.Item>
              <Form.Item label="Payment Type" name="paymentType">
                <Select>
                  <Select.Option value="CREDIT_CARD">Credit Card</Select.Option>
                  <Select.Option value="CASH">Cash</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create Subscription
                </Button>
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </>
  );
};

export default SubscriptionCreate;
