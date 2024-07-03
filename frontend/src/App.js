import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Vehicles from './pages/Vehicles';
import './App.css'
import Bookings from './pages/Bookings';
import VehicleDetails from './pages/VehicleDetails';
import VehicleReviews from './pages/VehicleReviews';
import UserInfo from './pages/UserInfo';
import BookingDetails from './pages/BookingDetails';
import GetVehicles from './pages/admin/GetVehicles';
import Error from './pages/Error';
import BookingsTable from './pages/admin/BookingsTable';
import UsersTable from './pages/admin/UsersTable';
import Notifications from './pages/Notifications';
function App() {
  const storedData = localStorage.getItem('userData');
  const data = storedData ? JSON.parse(storedData) : null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       { data?.isAdmin && <Route path="/users" element={<UsersTable />} />}
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
