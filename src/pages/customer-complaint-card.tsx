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
  Rate,
  Row,
  message,
} from "antd";
import axios from "axios";
import queryClient from "../utils/queryClient";
import { useQuery } from "react-query";

type Props = {
  complaint: Complaint;
  customerId: number;
};

const CustomerComplaintCard: FC<Props> = ({ complaint, customerId }) => {
  const [messageApi1, contextHolder1] = message.useMessage();
  const [messageApi2, contextHolder2] = message.useMessage();
  const [meTooClicked, setMeTooClicked] = useState(false);
  const [misleadingClicked, setMisleadingClicked] = useState(false);
  const disableMeToo = meTooClicked || customerId === complaint.customer.id;
  const disableMisleading =
    misleadingClicked || customerId === complaint.customer.id;
  const [solutionRating, setSolutionRating] = useState<number>(0);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

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

  const getSolution = async () => {
    const response = await axios.get(
      `http://localhost:3000/solution/solution-with-complaint`,
      { params: { complaintId: complaint.id } }
    );
    return response.data;
  };

  // useQuery hook'unu güncelleyin
  const { data } = useQuery(["solution", complaint.id], getSolution);
  const solution = data?.solutionWithComplaint;

  console.log(solution);

  const onFinishMeToo = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/complaint/increase-me-too/${complaint.id}`,
        {
          increaseMeToo: true,
        }
      );
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

  const onFinishSolutionRating = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/complaint/solutionrating/${complaint.id}`,
        {
          solutionRating: solutionRating,
        }
      );
      console.log(response);
      setRatingSubmitted(true);
      queryClient.invalidateQueries(["solution", complaint.id]);
      messageApi2.open({
        type: "success",
        content: "Successfully rated the solution!",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const onFinisMisleading = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/complaint/increase-misleading/${complaint.id}`,
        {
          increaseMisleading: true,
        }
      );
      console.log(response);
      setMisleadingClicked(true);
      queryClient.invalidateQueries("complaints");
      messageApi2.open({
        type: "success",
        content: "Successfully Misleading!",
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
            <span>Complaint Solution Rating: {complaint.solutionRating}</span>
          </Col>
          <Col xs={24}>
            <Collapse>
              <Collapse.Panel header="Comments" key={"comment"}>
                {complaint.comments.map((comment, index) => (
                  <div key={index}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <span>
                          - {comment.customer.name}: {comment.content}
                        </span>
                      </Col>
                    </Row>
                    <Divider />
                  </div>
                ))}

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

                <Divider />
                <h3>Solutions:</h3>
                {solution?.map((solution: any, index: any) => (
                  <div key={index}>
                    <p>Content: {solution.content}</p>
                    <p>Source of Complaint: {solution.sourceOfCompany}</p>
                    <p>Guarantee Level: {solution.guaranteeLevel}</p>
                    <Divider />
                  </div>
                ))}
                <Row gutter={[16, 16]}>
                  <Col>
                    <Form onFinish={onFinishMeToo}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={disableMeToo}
                        >
                          Me Too!
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col>
                    <Form onFinish={onFinisMisleading}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={disableMisleading}
                        >
                          Misleading!
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col>
                    {customerId === complaint.customer.id &&
                      !ratingSubmitted && (
                        <Form onFinish={onFinishSolutionRating}>
                          <Row gutter={16}>
                            {" "}
                            {/* 16px boşluk ile iki Col arasında mesafe oluşturur */}
                            <Col>
                              <Form.Item>
                                <Rate
                                  onChange={setSolutionRating}
                                  value={solutionRating}
                                />
                              </Form.Item>
                            </Col>
                            <Col>
                              <Form.Item>
                                <Button type="primary" htmlType="submit">
                                  Rate Solution
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      )}
                  </Col>
                </Row>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CustomerComplaintCard;
