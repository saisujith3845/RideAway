import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axiosInstance from '../utilities/axiosInstance'; 
import UserLayout from '../utilities/UserLayout';

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/admin/bookings');
      setBookings(response.data);
      setError(null); 
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('403 Forbidden: You do not have permission to access this resource.');
      } else {
        setError('Error fetching bookings.');
      }
      console.error('Error fetching bookings:', error);
    }
  };

  const deleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        const deletedBooking = bookings.find(booking => booking._id === bookingId);
        await axiosInstance.delete(`/admin/bookings/${bookingId}`);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
        setError(null); // Clear any previous errors    

        // Notify user
        await postNotification(deletedBooking, `Your booking for ${deletedBooking.vehicle_id.make} ${deletedBooking.vehicle_id.model} (${deletedBooking.vehicle_id.year}) has been cancelled or declined by admin due to technical reasons.`);

      } catch (error) {
        setError('Error deleting booking.');
        console.error('Error deleting booking:', error);
      }
    }
  };

  const postNotification = async (booking, message) => {
    const notification = {
      user_id: booking.user_id,
      vehicle_id: booking.vehicle_id,
      message 
    };

    try {
      await axiosInstance.post('/notifications', notification);
    } catch (error) {
      console.error('Error posting notification:', error);
    }
  };

  const confirmBooking = async (bookingId) => {
    try {
      const res = await axiosInstance.post(`/admin/bookings/${bookingId}/confirm`);
      const updatedBooking = res.data.booking;
      
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: 'confirmed' } : booking
      ));
      setError(null); 
      alert(res.data.message);

      // Post notification
      await postNotification(updatedBooking, `Your booking for ${updatedBooking.vehicle_id.make} ${updatedBooking.vehicle_id.model} (${updatedBooking.vehicle_id.year}) has been confirmed by the admin. Thanks for choosing us.`);

    } catch (error) {
      setError('Error confirming booking.');
      alert('Error confirming booking.');
      console.error('Error confirming booking:', error);
    }
  };

  const ErrorPage = ({ message }) => {
    return (
      <Container>
        <Alert variant="danger" className="mt-5">
          <h4>Error</h4>
          <p>{message}</p>
        </Alert>
      </Container>
    );
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <UserLayout>
      <Container>
        <h1 className="mt-4 mb-4 display-5 text-center">Bookings</h1>
        {bookings.length === 0 ? (
          <Alert variant="info" className="mt-5 text-center">
            <h4>📅 No Bookings Found, Admin! 📅</h4>
            <p>Our booking calendar is currently empty. Let's prepare for the next wave of reservations together!</p>
          </Alert>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>User Email</th>
                <th>Vehicle Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking._id}</td>
                  <td>{booking.user_id.email}</td>
                  <td>
                    {`${booking.vehicle_id.make} ${booking.vehicle_id.model} (${booking.vehicle_id.year}), ${booking.vehicle_id.fuelType}`}
                  </td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status !== 'confirmed' && <Button variant="success" className='mx-2' onClick={() => confirmBooking(booking._id)}>Confirm</Button>}
                    <Button variant="danger" onClick={() => deleteBooking(booking._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </UserLayout>
  );
};

export default BookingsTable;