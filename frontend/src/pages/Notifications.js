import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Import Trash icon from react-icons/fa
import axiosInstance from './axiosInstance'; 
import Header from './Header'; 

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications');
        setNotifications(response.data); 
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffMs = now - createdDate;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    return `${diffHours} hrs ago`;
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axiosInstance.delete(`/notifications/${notificationId}`);
      setNotifications(notifications.filter(notification => notification._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h4 className="text-center mb-3">Notifications</h4>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <ListGroup>
              {notifications.map(notification => (
                <ListGroup.Item key={notification._id} className="mb-3 d-flex justify-content-between align-items-center" action>
                  <div>
                    <h5 className="mb-1">{notification.message}</h5>
                    <small>{getTimeDifference(notification.date)}</small>
                  </div>
                  <FaTrash size={50} className="text-danger cursor-pointer" onClick={() => handleDeleteNotification(notification._id)} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Notifications;
