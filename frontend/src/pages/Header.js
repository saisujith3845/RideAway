import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppRegistration, NotificationsRounded } from "@mui/icons-material";
import { useNavigate, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { DataContext } from "./DataContext";

function Header() {
  const navigate = useNavigate();
  const { data,setData,setToken } = useContext(DataContext);

  const handleLogout = () => {
  
    localStorage.removeItem('token'); 
  localStorage.removeItem('userData');
  setToken(null); 
  setData(null);
    navigate('/');
  };

  return (
    <Navbar className="bg-warning">
      <Container>
        <Navbar.Brand className="fs-3 fw-bold" href="/vehicles">
        <Image src="logofinal.png" roundedCircle style={{ width: '50px', height: '50px' }} />
          Ride Away
        </Navbar.Brand>
        <Nav className="ms-auto d-flex justify-content-center align-items-center ">
          <Nav.Link as={Link} to="/notifications" className="text-center">
            <NotificationsRounded fontSize="medium" />
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
      </Container>
    </Navbar>
  );
}

export default Header;
