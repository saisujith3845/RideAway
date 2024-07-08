import React from 'react';
import { Form, Button, Container, Row, Col, Image, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      address: formData.get('address'),
      phone: formData.get('phone')
    };

    try {
      const response = await axios.post('http://localhost:8081/api/auth/register', data);
      console.log(response.data);

      // Redirect to login page or show success message
      alert("Registered Successfully!!")
      navigate('/login');

    } catch (error) {
      console.error('There was an error registering!', error);
      alert("something went wrong..try Again !!");
    }
  };

  return (
    <Container className="d-flex justify-content-center vh-100 align-items-center py-4 bg-light">
      <Row className="justify-content-center">
        <Col>
          <div className="text-center mb-4">
            <Image src="logofinal.png" alt="" width="150" height="150" roundedCircle />
          </div>
          <h1 className="text-center h3 mb-3 fw-normal">Register</h1>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="formName" label="Name">
              <Form.Control name="name" type="text" placeholder="Ravi Ram" required />
            </FloatingLabel>
            <FloatingLabel controlId="formEmail" label="Email address">
              <Form.Control name="email" type="email" placeholder="name@example.com" required />
            </FloatingLabel>
            <FloatingLabel controlId="formPassword" label="Password">
              <Form.Control name="password" type="password" placeholder="Password" required />
            </FloatingLabel>
            <FloatingLabel controlId="formAddress" label="Address">
              <Form.Control name="address" type="text" placeholder="Some city" required />
            </FloatingLabel>
            <FloatingLabel controlId="formPhone" label="Phone">
              <Form.Control name="phone" type="text" pattern="[0-9]{10}" placeholder="+91 953124134" required />
            </FloatingLabel>
            <Button variant="warning" type="submit" className="w-100 py-2">Register</Button>
          </Form>
          <div className="text-center mt-3">
            <Link to='/login' className='text-dark'>Already have an account? Login here</Link>
          </div>
          <p className="mt-5 mb-3 text-body-secondary text-center">© 2024</p>
        </Col>
      </Row>
    </Container>
  );
}
  
export default Register;
