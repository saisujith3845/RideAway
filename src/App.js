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
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:vehicle_id" element={<VehicleDetails />} />
        <Route path="/vehicles/:vehicle_id/reviews" element={<VehicleReviews/>} />
        <Route path="/user/:user_id/bookings" element={<Bookings />} />
        <Route path="/user/:user_id" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
