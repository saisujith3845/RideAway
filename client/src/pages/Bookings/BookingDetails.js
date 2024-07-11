import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axiosInstance from '../utilities/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLayout from '../utilities/UserLayout';
import Loadingpage from '../utilities/Loadingpage';

function BookingDetails() {
  const { booking_id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/${booking_id}`);
        setBooking(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [booking_id]);

  const handleDeleteBooking = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/bookings/${booking_id}`);
        alert('Booking deleted successfully');
        navigate('/bookings');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <Loadingpage />;
  }

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserLayout>
        <Container className="mt-5">
          <h2 className="my-4 fw-bolder text-center">Booking Details</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formVehicle">
                  <Form.Label column sm="3">Vehicle</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      name="vehicle"
                      value={`${booking.vehicle_id.make} ${booking.vehicle_id.model} (${booking.vehicle_id.year})`}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formStartDate">
                  <Form.Label column sm="3">Start Date</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="date"
                      name="start_date"
                      value={booking.start_date.split('T')[0]}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEndDate">
                  <Form.Label column sm="3">End Date</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="date"
                      name="end_date"
                      value={booking.end_date.split('T')[0]}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPickupLocation">
                  <Form.Label column sm="3">Pickup Location</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      name="pickupLocation"
                      value={booking.pickupLocation}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDropoffLocation">
                  <Form.Label column sm="3">Dropoff Location</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      name="dropoffLocation"
                      value={booking.dropoffLocation}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formTotalCost">
                  <Form.Label column sm="3">Total Cost</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      name="totalCost"
                      value={booking.totalCost}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formStatus">
                  <Form.Label column sm="3">Status</Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      name="status"
                      value={booking.status}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <div className="text-center">
                  <Button variant="danger" onClick={handleDeleteBooking}>
                    Delete Booking
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </UserLayout>
    </>
  );
}

export default BookingDetails;
  