import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../utilities/axiosInstance';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { TextField } from '@mui/material';

function BookingForm({ vehicleId, onBookingConfirmed }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 60 * 1000),
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axiosInstance.get(`/vehicles/${vehicleId}`);
        setVehicle(response.data);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (field, date) => {
    if (field === 'startDate') {
      setFormData({
        ...formData,
        startDate: date,
        endDate: date > formData.endDate ? new Date(date.getTime() + 30 * 60 * 1000) : formData.endDate,
      });
    } else {
      setFormData({ ...formData, endDate: date });
    }
  };

  const calculateTotalCost = () => {
    if (!vehicle) return 0;
    const { rentPerHrs } = vehicle;
    const { startDate, endDate } = formData;
    const hours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));
    return rentPerHrs * hours;
  };

  const handleSubmit = async () => {
    const { pickupLocation, dropoffLocation, startDate, endDate } = formData;
  
    // Check if all required fields are filled
    if (!pickupLocation || !dropoffLocation || !startDate || !endDate) {
      setAlert({ open: true, message: 'All fields are required', severity: 'error' });
      return;
    }
  
    const data = {
      vehicle_id: vehicleId,
      start_date: startDate,
      end_date: endDate,
      pickupLocation,
      dropoffLocation,
    };
  
    try {
      const response = await axiosInstance.post('/bookings', data);
      console.log(response.data);
      if (response.data.overlappingBookings) {
        setAlert({ open: true, message: 'Not available in that slot', severity: 'error' });
      } else {
        onBookingConfirmed();
        setAlert({
          open: true,
          message: 'Your booking request has been sent to the admin. Please wait for approval. Thank you!',
          severity: 'success',
        });
  
        handleClose();
        navigate('/bookings');
      }
    } catch (error) {
      console.error('Error creating booking:', error.response.data);
      setAlert({ open: true, message: 'Error Occurred. Please try again!', severity: 'error' });
    }
  };
  

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
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
              <Form.Label>Start Date & Time</Form.Label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                customInput={<TextField required />}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date & Time</Form.Label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={formData.startDate}
                customInput={<TextField required />}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="totalCost">
              <Form.Label>Total Cost</Form.Label>
              <Form.Control
                type="text"
                value={`$${calculateTotalCost()}`}
                readOnly
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

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default BookingForm;
