import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axiosInstance from '../utilities/axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function BookingForm({ vehicleId, onBookingConfirmed }) {
  const navigate = useNavigate(); // Access the navigate function
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    startDate: "",
    endDate: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const data = {
      vehicle_id: vehicleId,
      start_date: formData.startDate,
      end_date: formData.endDate,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
    };

    try {
      const response = await axiosInstance.post('/bookings', data);
      console.log('Booking Successful:', response.data);
      
      // Update vehicle availability to false
      await axiosInstance.put(`/vehicles/${vehicleId}`, { availability: false });

      // Notify parent component of booking confirmation
      onBookingConfirmed(); 

      // Redirect to /bookings page using navigate function
      alert("Your booking request has been sent to the admin. Please wait for approval. Thank you!");
      navigate('/bookings');

      handleClose(); // Close modal or perform any other necessary cleanup
    } catch (error) {
      console.error('Error creating booking:', error.response.data);
      alert("Error Occured ..try Again!!");
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-warning" closeButton>
          <Modal.Title>Booking Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="bg-light-subtle">
            <Form.Group className="mb-3" controlId="pickupLocation">
              <Form.Label>Pickup Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pickup address"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dropoffLocation">
              <Form.Label>Drop Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter drop address"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingForm;
