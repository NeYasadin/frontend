import { FC, useEffect, useState } from "react";
import { message } from "antd";
import { Company } from "../interfaces/models";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Rate,
  Row,
  Select,
} from "antd";
import axios from "axios";
import queryClient from "../utils/queryClient";
import { useParams } from "react-router-dom";
import CustomerNavbar from "../components/customer-navbar";
const { Option } = Select;

const CreateComplaint: FC = () => {
const { id } = useParams<{ id: string }>();
const customerId = parseInt(id);
const [companies, setCompanies] = useState<Company[]>([]);
const [messageApi, contextHolder] = message.useMessage();
useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/company/");
            setCompanies(response.data.companies);
            console.log(response.data.companies);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
 }, []);
  const [creationForm] = Form.useForm();

  const onCreateComplaint = async (values: {
    title: string;
    content: string;
    companyId: number;
    customerId: number;
    priorityLevel: number;
  }) => {
    const obj = {
      title: values.title,
      content: values.content,
      companyId: values.companyId,
      customerId: customerId,
      priorityLevel: values.priorityLevel,
    };

    try {
      const response = await axios.post("http://localhost:3000/complaint/", obj);
      console.log(response);
      creationForm.resetFields();
      queryClient.invalidateQueries("complaints");
      messageApi.open({
        type: "success",
        content: "Successfully created complaint!",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
    {contextHolder}
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CustomerNavbar customerId={customerId} />
      </Col>
      <Col span={24}>
        <Card>
          <Form form={creationForm} onFinish={onCreateComplaint} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please input the title!' }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="companyId"
                  label="Company"
                  rules={[{ required: true, message: 'Please select the company!' }]}
                >
                  <Select placeholder="Select a Company">
                    {companies.map((company) => (
                      <Option key={company.id} value={company.id}>
                        {company.name}
                      </Option>
                    ))}
                    <Option key="noCompany" value={0}>No Company</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="content"
                  label="Content"
                  rules={[{ required: true, message: 'Please input the content!' }]}
                >
                  <Input.TextArea placeholder="Content" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="priorityLevel"
                  label="Priority Level"
                >
                  <Rate />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit Complaint
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
    </>
  );
};

export default CreateComplaint;
