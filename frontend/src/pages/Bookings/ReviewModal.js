import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../utilities/axiosInstance';
import Rating from '@mui/material/Rating';

const ReviewModal = ({ show, handleClose, vehicleId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/reviews/${vehicleId}`, { vehicle_id: vehicleId, user_id: userData._id, rating, comment });
      alert('Review submitted successfully');
      handleClose();
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5} // Adjust precision if needed, e.g., 0.5 for half stars
              required
            />
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose} className="ml-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;
