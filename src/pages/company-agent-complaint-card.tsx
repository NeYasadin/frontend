import { FC } from "react";
import { Complaint } from "../interfaces/models";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Rate,
  Row,
} from "antd";
import axios from "axios";
import queryClient from "../utils/queryClient";

type Props = {
  complaint: Complaint;
  companyAgentId: number;
};

const CompanyAgentComplaintCard: FC<Props> = ({ complaint }) => {
  const [solutionForm] = Form.useForm();

  const onFinishSolution = async (values: {
    content: string;
    guaranteeLevel: number;
    sourceOfComplaint: string;
  }) => {
    const obj = {
      content: values.content,
      companyAgentId: 1,
      complaintId: complaint.id,
      guaranteeLevel: values.guaranteeLevel,
      sourceOfComplaint: values.sourceOfComplaint,
    };

    try {
      const response = await axios.post("http://localhost:3000/solution/", obj);
      console.log(response);
      solutionForm.resetFields();
      queryClient.invalidateQueries("complaints");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col xs={24}>Customer: {complaint.customer.name}</Col>
        <Col xs={24}>Created At: {complaint.createdAt}</Col>
        <Col xs={24}>
          <span>Complaint: {complaint.content}</span>
        </Col>
        <Col xs={24}>
          <Collapse>
            <Collapse.Panel header="Comments" key={"comment"}>
              {complaint.comments.map((comment) => (
                <>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <span>
                        - {comment.customer.name}: {comment.content}
                      </span>
                    </Col>
                  </Row>
                </>
              ))}
            </Collapse.Panel>

            <Collapse.Panel header="Solutions" key={"solution"}>
              <Row gutter={[16, 16]} style={{ paddingBottom: "30px" }}>
                {complaint.solutions.map((solution) => (
                  <Col xs={24}>
                    <Divider />
                    <Row>
                      <Col xs={24}>Created At: {solution.createdAt}</Col>
                      <Col xs={24}>
                        {solution.companyAgent.name}: {solution.content}
                      </Col>
                      <Col xs={24}>
                        Source of Complaint: {solution.sourceOfComplaint}
                      </Col>
                      <Col xs={24}>
                        Guarantee Level: {solution.guaranteeLevel}
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
              <Divider />
              <Form form={solutionForm} onFinish={onFinishSolution}>
                <Form.Item name={"content"}>
                  <Input placeholder="Add Solution" />
                </Form.Item>
                <Form.Item name={"sourceOfComplaint"}>
                  <Input placeholder="Source of Complaint" />
                </Form.Item>
                <Form.Item name={"guaranteeLevel"} label={"Guarantee Level"}>
                  <Rate />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </Card>
  );
};

export default CompanyAgentComplaintCard;
