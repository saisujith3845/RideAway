import { Navbar, Container, Nav } from "react-bootstrap";
import { AccountCircle,AppRegistration, NotificationsRounded } from "@mui/icons-material";

import "bootstrap/dist/css/bootstrap.css";
function Header() {
  return (
    <Navbar className="bg-warning">
      <Container>
        <Navbar.Brand className="fs-3 fw-bold" href="/vehicles">
          Ride Away
        </Navbar.Brand>
        <div className="d-flex justify-content-end">
          <Nav className="me-auto ">
            <Nav.Link className="text-center " href="#">
              <NotificationsRounded fontSize="medium" />
              <br />
              <span className="icon-text text-dark">Notifications</span>
            </Nav.Link>
            <Nav.Link className="text-center" href="/bookings">
              <AppRegistration fontSize="small" />
              <br />
              <span className="icon-text text-dark">Bookings</span>
            </Nav.Link>
            <Nav.Link className="text-center" href="#">
              <AccountCircle fontSize="medium" />
              <br />
              <span className="icon-text text-dark">Profile</span>
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
