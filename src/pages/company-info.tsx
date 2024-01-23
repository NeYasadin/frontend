import axios from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CompanyAgentNavbar from "../components/company-agent-navbar";
import { Card, Col, Row } from "antd";
import imagecompany from "../assets/company.png"

const CompanyInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const getCompanyByAgentId = async () => {
    const response = await axios.get(
        `http://localhost:3000/company-agent/company`,
        { params:  { id: parseInt(id)}}
    );
    return response.data;
  };
  const { data } = useQuery("company", getCompanyByAgentId);
  const company = data?.company[0];
  console.log(company);


  return (
    <>
      <Row>
        <Col xs={24}>
          <CompanyAgentNavbar companyAgentId={parseInt(id)} />
        </Col>
      </Row>
      <Row gutter={16} style={{ padding: "30px" }}>
        <Col xs={24} md={16}>
          <Card title="Company Details" bordered={false}>
            <p style={{ fontSize: '20px' }}>Name: {company?.name}</p>
            <p style={{ fontSize: '20px' }}>Email: {company?.mail}</p>
            <p style={{ fontSize: '20px' }}>Phone: {company?.phoneNum}</p>
            <p style={{ fontSize: '20px' }}>Description: {company?.description}</p>
            <p style={{ fontSize: '20px' }}>Sector: {company?.sector}</p>
            <p style={{ fontSize: '20px' }}>Country: {company?.country}</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <img 
            src={imagecompany}
            alt="Company" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '20%'  
            }} 
          />
        </Col>
      </Row>
    </>
  );
          };  

export default CompanyInfo;
