import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BookingsIcon from '@mui/icons-material/Book';
import ReviewsIcon from '@mui/icons-material/RateReview';
import { useNavigate, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { DataContext } from "../DataContext";

function Header() {
  const navigate = useNavigate();
  const { data, setData, setToken } = useContext(DataContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setToken(null);
    setData(null);
    navigate('/');
  };

  return (
    <Navbar className="bg-warning p-0">
      <Container>
        <Navbar.Brand className="fs-3 fw-bold" href="/vehicles">
          <Image src="logofinal.png" roundedCircle style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          Ride Away
        </Navbar.Brand>
        <Nav className="ms-auto d-flex justify-content-center align-items-center ">
          <Nav.Link as={Link} to="/users" className="text-center">
            <PeopleIcon fontSize="medium" />
            <br />
            <span className="icon-text text-dark">Users</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/vehicles" className="text-center">
            <DirectionsCarIcon fontSize="medium" />
            <br />
            <span className="icon-text text-dark">Vehicles</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/bookings" className="text-center">
            <BookingsIcon fontSize="medium" />
            <br />
            <span className="icon-text text-dark">Bookings</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/reviews" className="text-center">
            <ReviewsIcon fontSize="medium" />
            <br />
            <span className="icon-text text-dark">Reviews</span>
          </Nav.Link>
          <Nav.Link className="text-center">
            <AccountCircleIcon fontSize="medium" />
            <br />
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Profile"
              menuVariant="light"
            >
              <NavDropdown.Item>
                <Link to={`/user/${data._id}`} className="text-decoration-none text-reset">
                  Account Details
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
