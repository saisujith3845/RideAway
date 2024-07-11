import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../utilities/axiosInstance';
import { useNavigate } from 'react-router-dom';
import UnAuthorizedPage from '../utilities/UnAuthorizedPage';
import UserLayout from '../utilities/UserLayout';
import Loadingpage from '../utilities/Loadingpage';
import ReviewModal from './ReviewModal';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentVehicleId, setCurrentVehicleId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const udata = localStorage.getItem('userData');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleRowClick = (bookingId) => {
    // Prevent navigation when clicking on the review button
    const clickedElement = document.activeElement.tagName.toLowerCase();
    if (clickedElement !== 'button') {
      navigate(`/bookings/${bookingId}`);
    }
  };

  const review = (vehicleId) => {
    setCurrentVehicleId(vehicleId);
    setModalShow(true);
  };

  if (loading) {
    return <Loadingpage />;
  }

  return (
    <>
      {udata ? (
        <UserLayout>
          {error && <div>Error: {error}</div>}
          <h1 className="text-center mb-3 fw-bolder display-5">Bookings</h1>
          {bookings.length > 0 ? (
            <Table bordered hover responsive>
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
                  <tr key={booking._id} onClick={() => handleRowClick(booking._id)} style={{ cursor: 'pointer' }}>
                    <td>{index + 1}</td>
                    <td>{`${booking.vehicle_id.make} ${booking.vehicle_id.model} (${booking.vehicle_id.year})`}</td>
                    <td>{new Date(booking.start_date).toLocaleString()}</td>
                    <td>{new Date(booking.end_date).toLocaleString()}</td>
                    <td>{booking.pickupLocation}</td>
                    <td>{booking.dropoffLocation}</td>
                    <td>₹{booking.totalCost}</td>
                    <td>{booking.status}</td>
                    <td>
                      {booking.status === 'confirmed' && (
                        <Button variant="warning" onClick={() => review(booking.vehicle_id._id)}>
                          Review
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center my-4">
              <div>✨ Your Journey Awaits! ✨</div>
              <div>Our booking slots are eagerly anticipating your next adventure. Start your experience with us today!</div>
            </div>
          )}
          <ReviewModal show={modalShow} handleClose={() => setModalShow(false)} vehicleId={currentVehicleId} />
        </UserLayout>
      ) : (
        <UnAuthorizedPage />
      )}
    </>
  );
}

export default Bookings;
