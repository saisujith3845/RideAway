import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from './axiosInstance'; // Import your configured axios instance
import Header from './Header';

function BookingsTable() {
  
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings'); // Adjust the endpoint as needed
        setBookings(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      {error && <div>Error: {error}</div>}
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Total Cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{`${booking.vehicle_id.make} ${booking.vehicle_id.model} (${booking.vehicle_id.year})`}</td>
              <td>{new Date(booking.start_date).toLocaleDateString()}</td>
              <td>{new Date(booking.end_date).toLocaleDateString()}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.dropoffLocation}</td>
              <td>{booking.totalCost}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function Bookings() {
  return (
    <>
      <Header />
      <BookingsTable />
    </>
  );
}

export default Bookings;
