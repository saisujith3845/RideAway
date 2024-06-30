import React from 'react';
import { Form, Button, Container, Row, Col, Image, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', data);
      console.log(response.data);
      console.log(response.data.token);

      localStorage.setItem('token', response.data.token);
      navigate('/vehicles');
      console.log('Login Successful');
    } catch (error) {
      document.getElementById("errorMessage").innerText = error.response.data.error;
      console.error('There was an error Logging!', error);
    }



    
  };

  return (
    <Container className="d-flex justify-content-center vh-100 align-items-center py-4 bg-light">
      <Row className="justify-content-center">
        <Col >
          <main className="form-signin">
            <Form onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                <Image src="logofinal.png" alt="" width="150" height="150" roundedCircle />
              </div>
              <h1 className="text-center h3 mb-3 fw-normal">Login</h1>
              <FloatingLabel controlId="floatingInput" label="Email address">
                <Form.Control name="email" type="email" placeholder="name@example.com" required />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control name="password" type="password" placeholder="Password" required />
              </FloatingLabel>
              <Button variant="warning" className="w-100 py-2 mt-3" type="submit">Login</Button>
              <div className="text-center mt-3">
                <Link to='/register' className='text-dark'>Don't have an account? Register here</Link>
              </div>
              <p className="mt-5 mb-3 text-body-secondary text-center">© 2024</p>
            </Form>
            <p id='errorMessage' className='text-center'></p>
          </main>
        </Col>
      </Row>
    </Container>
  );
}
