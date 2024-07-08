import React from 'react'
import { Container ,Row,Col,Button,} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UnAuthorizedPage = () => {
  return (
    <Container fluid className="d-flex vh-100">
      <Row className="justify-content-center align-self-center w-100">
        <Col xs="auto" className="text-center">
          <h2 className="mt-5">Unauthorized Access</h2>
          <Button variant="warning" className="mt-3">
            <Link to="/" className="text-decoration-none text-white">
              Go To Login
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default UnAuthorizedPage