import { FC, useState } from "react";
import { Complaint } from "../interfaces/models";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Row,
  message,
} from "antd";
import axios from "axios";
import queryClient from "../utils/queryClient";

type Props = {
  complaint: Complaint;
  customerId: number;
};

const CustomerComplaintCard: FC<Props> = ({ complaint, customerId }) => {
  const [messageApi1, contextHolder1] = message.useMessage();
  const [messageApi2, contextHolder2] = message.useMessage();
  const [meTooClicked, setMeTooClicked] = useState(false);
  const disableMeToo = meTooClicked || customerId === complaint.customer.id;

  const onFinishComment = (values: { content: string }) => {
    const obj = {
      content: values.content,
      complaintId: complaint.id,
      customerId: customerId,
    };

    try {
      const response = axios.post("http://localhost:3000/comment/", obj);
      console.log(response);
      queryClient.invalidateQueries("complaints");
      messageApi1.open({
        type: "success",
        content: "Successfully created comment!",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onFinishMeToo = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/complaint/${complaint.id}`, {
        increaseMeToo: true,
      });
      console.log(response);
      setMeTooClicked(true);
      queryClient.invalidateQueries("complaints");
      messageApi2.open({
        type: "success",
        content: "Successfully MeToo!",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  return (
    <>
    {contextHolder1}
    {contextHolder2}
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
              &nbsp; &nbsp;
              <Divider />
              <Form onFinish={onFinishComment}>
                <Form.Item name={"content"}>
                  <Input placeholder="Add Comment" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Comment
                  </Button>
                </Form.Item>
              </Form>
              <Form onFinish={onFinishMeToo}>
                <Form.Item>
                 <Button type="primary" htmlType="submit" disabled={disableMeToo}>
                   Me Too!
                 </Button>
                </Form.Item>
               </Form>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </Card>
    </>
  );
};

export default CustomerComplaintCard;
