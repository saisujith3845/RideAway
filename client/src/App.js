import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Authentication/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Vehicles from './pages/vehicles/Vehicles';
import './App.css'
import Bookings from './pages/Bookings/Bookings';
import VehicleDetails from './pages/vehicles/VehicleDetails';
import VehicleReviews from './pages/vehicles/VehicleReviews';
import UserInfo from './pages/utilities/UserInfo';
import BookingDetails from './pages/Bookings/BookingDetails';
import GetVehicles from './pages/admin/GetVehicles';
import Error from './pages/utilities/Error';
import BookingsTable from './pages/admin/BookingsTable';
import UsersTable from './pages/admin/UsersTable';
import Notifications from './pages/utilities/Notifications'
import ReviewsTable from './pages/admin/ReviewsTable';

function App() {
  const storedData = localStorage.getItem('userData');
  const data = storedData ? JSON.parse(storedData) : null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       { data?.isAdmin &&  <Route path="/users" element={<UsersTable />} />}
       {data?.isAdmin && <Route path="/reviews" element={<ReviewsTable />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={data?.isAdmin ? <GetVehicles /> : <Vehicles />} />
        <Route path="/vehicles/:vehicle_id" element={<VehicleDetails />} />
        <Route path="/vehicles/:vehicle_id/reviews" element={<VehicleReviews />} />
        <Route path="/bookings" element={!data?.isAdmin?<Bookings />:<BookingsTable />} />
        <Route path="/bookings/:booking_id" element={<BookingDetails />} />
        <Route path="/user/:user_id" element={<UserInfo />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="*" element={<Error />} /> 
      </Routes>
    </Router>
  );
}

export default App;
