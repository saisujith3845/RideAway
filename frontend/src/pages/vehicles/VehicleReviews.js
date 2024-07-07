import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utilities/axiosInstance';
import Header from '../utilities/Header';
import { Container, Box, Typography, Paper, Grid, Avatar, Rating, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import dayjs from 'dayjs';

const VehicleReviews = () => {
  const { vehicle_id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axiosInstance.get(`/reviews/${vehicle_id}`);
        setReviews(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    }

    fetchReviews();
  }, [vehicle_id]);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Vehicle Reviews
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                      <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: 'primary.main' }}>
                        <PersonIcon />
                      </Avatar>
                      <Typography variant="subtitle1" align="center">
                        {review.user_id.name}
                      </Typography>
                      <Rating value={review.rating}  precision={0.5}  readOnly />
                      <Typography variant="body2" color="text.secondary" align="center" mt={1}>
                        {dayjs(review.date).format('MMM DD, YYYY')}
                      </Typography>
                    </Box>
                    <Typography variant="body1" align="center">
                      {review.comment}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center" sx={{ mt: 4, width: '100%' }}>
                🌟 No Reviews Yet! 🌟 <br/>Your chance to be the first reviewer awaits. Book a vehicle and share your experience—let's kickstart the feedback!
              </Typography>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default VehicleReviews;
