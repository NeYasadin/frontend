import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomerNavbar from "../components/customer-navbar";
import { Row, Col, Table } from "antd";
import axios from "axios";

interface Customer {
  id: number;
  name: string;
  meTooCount: number;
}

const TopFiveCustomer: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataCustomer = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/complaint/me-too-customer");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataCustomer();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - MeToo Count: {customer.meTooCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopFiveCustomer;
