import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppRegistration, NotificationsRounded } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import { useNavigate, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { DataContext } from "./DataContext";
import logo from './logofinal.png'

function Header() {
  const navigate = useNavigate();
  const { data, setData, setToken, notifications } = useContext(DataContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setToken(null);
    setData(null);
    navigate('/');
  };

  return (
    <Navbar className="bg-warning" expand="lg">
      <Container>
        <Navbar.Brand className="fs-3 fw-bold" as={Link} to="/vehicles">
          <Image src={logo} roundedCircle style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          Ride Away
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex justify-content-center align-items-center">
            <Nav.Link as={Link} to="/notifications" className="text-center">
              {notifications?.length > 0 ? (
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsRounded fontSize="medium" />
                </Badge>
              ) : (
                <NotificationsRounded fontSize="medium" />
              )}
              <br />
              <span className="icon-text text-dark">Notifications</span>
            </Nav.Link>
            <Nav.Link as={Link} to={`/bookings`} className="text-center">
              <AppRegistration fontSize="small" />
              <br />
              <span className="icon-text text-dark">Bookings</span>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
