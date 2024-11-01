import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { BsFillPeopleFill, BsFillCartFill, BsFillCreditCardFill } from 'react-icons/bs';
import API from '../../const/Api';

const OrderDetails = () => {
  const [filters, setFilters] = useState({
    email: '',
    startDate: '',
    endDate: '',
    orderTrackingId: '',
  });
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalAmount: 0,
    uniqueCustomers: 0,
  });

  const token = localStorage.getItem("jwt")

  // Fetch orders based on filters
  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${API}admin/find`, filters,{
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Bearer token
          'Content-Type': 'application/json', // Set the content type
        }
      });
      const fetchedOrders = response.data;

      // Calculate stats
      const totalAmount = fetchedOrders.reduce((acc, order) => acc + order.totalPrice, 0);
      const uniqueCustomers = new Set(fetchedOrders.map(order => order.customer.email)).size;

      setOrders(fetchedOrders);
      setStats({
        totalOrders: fetchedOrders.length,
        totalAmount,
        uniqueCustomers,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Trigger fetch on load and filter change
  useEffect(() => {
    fetchOrders();
  }, [filters]);

  return (
    <div className="container">
      <h2 className="text-center my-4">Admin Dashboard</h2>

      {/* Summary Section */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <BsFillCartFill size={40} className="text-primary" />
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>{stats.totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <BsFillCreditCardFill size={40} className="text-success" />
              <Card.Title>Total Amount</Card.Title>
              <Card.Text>${stats.totalAmount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <BsFillPeopleFill size={40} className="text-warning" />
              <Card.Title>Unique Customers</Card.Title>
              <Card.Text>{stats.uniqueCustomers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filter Form */}
      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={filters.email}
                onChange={handleInputChange}
                placeholder="Enter customer email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Order Tracking ID</Form.Label>
              <Form.Control
                type="text"
                name="orderTrackingId"
                value={filters.orderTrackingId}
                onChange={handleInputChange}
                placeholder="Enter tracking ID"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" className="mt-3" onClick={fetchOrders}>
          Apply Filter
        </Button>
      </Form>

      {/* Orders Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order Tracking ID</th>
            <th>Total Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Delivery Date</th>
            <th>Customer Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderTrackingId}</td>
              <td>{order.totalQuantity}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{order.deliveryDate}</td>
              <td>{order.customer.email}</td>
              <td>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
