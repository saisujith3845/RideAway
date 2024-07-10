import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axiosInstance from '../utilities/axiosInstance';
import UserLayout from '../utilities/UserLayout';
import { Link } from 'react-router-dom';
import Loadingpage from '../utilities/Loadingpage';

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [reviews]);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get('/reviews');
      setReviews(response.data);
      setLoading(false)
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('403 Forbidden: You do not have permission to access this resource.');
      } else {
        setError('Error fetching reviews.');
      }
      console.error('Error fetching reviews:', error);
    }
  };

  const deleteReview = async (reviewId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/reviews/${reviewId}`);
        setReviews(reviews.filter(review => review._id !== reviewId));
        setError(null); // Clear any previous errors    
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('403 Forbidden: You do not have permission to delete this review.');
        } else {
          setError('Error deleting review.');
        }
        console.error('Error deleting review:', error);
      }
    }
  };

  const ErrorPage = ({ message }) => {
    return (
      <Container>
        <Alert variant="danger" className="mt-5">
          <h4>Error</h4>
          <p>{message}</p>
        </Alert>
      </Container>
    );
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (loading) {
    return (
      <Loadingpage />
    );
  }


  return (
    <UserLayout>
      <Container>
        <h1 className="mt-4 mb-4 display-5 fw-bolder text-center">Reviews</h1>
        {reviews.length === 0 ? (
          <Alert variant="info" className="mt-5 text-center">
            <h4>No Reviews in Sight, Admin!</h4>
            <p>Our review page is currently blank. Let's get ready for the next wave of insights soon!</p>
          </Alert>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle ID</th>
                <th>Vehicle Name</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review._id}</td>
                  <td>{review.vehicle_id._id}</td>
                  <td><Link to={`/vehicles/${review.vehicle_id._id}`}>{`${review.vehicle_id.make} ${review.vehicle_id.model} (${review.vehicle_id.year})`}</Link></td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteReview(review._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </UserLayout>
  );
};

export default ReviewsTable;
