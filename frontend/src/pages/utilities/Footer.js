import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container fluid className="fixed-bottom">
        <Row>
          <Col className="text-center">
            <p>Ride Away Copyright &copy; 2898AD</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
