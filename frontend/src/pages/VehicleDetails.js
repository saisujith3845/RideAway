import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography,  Divider, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import axiosInstance from './axiosInstance';
import Header from './Header';
import Rating from '@mui/material/Rating';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const VehicleDetails = () => {
  const { vehicle_id } = useParams();
  const [vehicleDetails, setVehicleDetails] = useState(null);

  useEffect(() => {
    async function fetchVehicleDetails() {
      try {
        const res = await axiosInstance.get(`/vehicles/${vehicle_id}`);
        setVehicleDetails(res.data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    }

    fetchVehicleDetails();
  }, [vehicle_id]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!vehicleDetails) {
    return <div>Loading...</div>; // or handle loading state as per your UI/UX
  }

  const images = ['/vehicle1.jpg', '/vehicle1.jpg', '/vehicle1.jpg']; // Example images

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={isSmallScreen ? 2 : 4} alignItems="stretch">
          {/* Image Carousel */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Carousel>
                {images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`${vehicleDetails.make} ${vehicleDetails.model}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card>
          </Grid>
          {/* Details */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h4" component="div" gutterBottom align="center">
                  {vehicleDetails.make} {vehicleDetails.model}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                </Box>
                <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
                  {vehicleDetails.fuelType} | {vehicleDetails.year}
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                  ${vehicleDetails.rentPerHrs} per hour
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Vehicle Details
                </Typography>
                {/* Additional details specific to the vehicle can be added here */}
              </CardContent>
              <Box sx={{ textAlign: 'center', pb: 2 }}>
                <Button variant="contained" color="primary" component={Link} to={`/vehicles/${vehicle_id}/reviews`}>
                  Check all reviews
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default VehicleDetails;
