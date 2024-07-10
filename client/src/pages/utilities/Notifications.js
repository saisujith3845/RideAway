import React, { useContext } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Import Trash icon from react-icons/fa
import axiosInstance from './axiosInstance';
import { DataContext } from './DataContext';
import UserLayout from './UserLayout';

function Notifications() {
  const { notifications, setNotifications } = useContext(DataContext);

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
      setNotifications(notifications.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };



  return (
    <>
     <UserLayout>
      <Container className="mt-4">
        <h1 className="text-center mb-3 fw-bolder display-5">Notifications</h1>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            {notifications.length > 0 ? (
              <ListGroup>
                {notifications.map((notification) => (
                  <ListGroup.Item key={notification._id} className="mb-3 d-flex justify-content-between align-items-center" action>
                    <div>
                      <h5 className="mb-1">{notification.message}</h5>
                      <small>{getTimeDifference(notification.date)}</small>
                    </div>
                    <FaTrash size={20} className="text-danger cursor-pointer" onClick={() => handleDeleteNotification(notification._id)} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="text-center my-4">
                <div>📩 No Updates Yet 📩</div>
                <div>Notifications will arrive once your booking has been approved or declined. Thank you for your patience!</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      </UserLayout>
    </>
  );
}

export default Notifications;
