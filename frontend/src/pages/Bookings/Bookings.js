import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from '../utilities/axiosInstance';
import Header from '../utilities/Header';
import UnAuthorizedPage from '../utilities/UnAuthorizedPage';
import Button from 'react-bootstrap/Button'; // Make sure to import Button from react-bootstrap
import ReviewModal from './ReviewModal'; // Import the ReviewModal component

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentVehicleId, setCurrentVehicleId] = useState(null);
  const navigate = useNavigate();
  const udata = localStorage.getItem('userData');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings'); 
        setBookings(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookings();
  }, [bookings]);

  const handleRowClick = (bookingId) => {
    navigate(`/bookings/${bookingId}`);
  };

  const review = (vehicleId) => {
    setCurrentVehicleId(vehicleId);
    setModalShow(true);
  };

  return (
    <>
      {udata ? (
        <>
          <Header />
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} >
                  <td>{index + 1}</td>
                  <td onClick={() => handleRowClick(booking._id)}>{`${booking.vehicle_id.make} ${booking.vehicle_id.model} (${booking.vehicle_id.year})`}</td>
                  <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                  <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                  <td>{booking.pickupLocation}</td>
                  <td>{booking.dropoffLocation}</td>
                  <td>{booking.totalCost}</td>
                  <td>{booking.status}</td>
                  {booking.status === 'confirmed' && (
                    <td>
                      <Button variant='warning' onClick={() => review(booking.vehicle_id._id)}>Review</Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          <ReviewModal
            show={modalShow}
            handleClose={() => setModalShow(false)}
            vehicleId={currentVehicleId}
          />
        </>
      ) : (
        <UnAuthorizedPage />
      )}
    </>
  );
}

export default Bookings;
