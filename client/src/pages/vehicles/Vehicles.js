import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utilities/axiosInstance';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.css";
import BookingForm from '../Bookings/BookingForm';
import UnAuthorizedPage from '../utilities/UnAuthorizedPage';
import UserLayout from '../utilities/UserLayout';
import {  Button } from 'react-bootstrap';
import Loadingpage from '../utilities/Loadingpage';

function VehicleCard({ details }) {
   
    const imageUrl = details.img ? `data:${details.img.contentType};base64,${details.img.data}` : "logofinal.png";
    const cardClasses = details.availability ? '' : 'opacity-50';

    return (
        <Card style={{ width: "300px",height:"400px" }} className={`m-3 ${cardClasses} position-relative`}>
            <Link to={`/vehicles/${details._id}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={imageUrl} style={{width:'300px',height:'157px'}}/>
                <Card.Body className='text-center bg-secondary-subtle'>
                    <Card.Title className='fs-3'>{details.make} {details.model}</Card.Title>
                    <Card.Text className='fs-6'>{details.fuelType} {details.year}</Card.Text>
                    <Card.Text className='fs-5'>
                    ₹{details.rentPerHrs} per hour
                    </Card.Text>
                </Card.Body>
            </Link>
            {details.availability && (
                <Card.Body className='text-center bg-secondary-subtle'>
                    <BookingForm vehicleId={details._id} onBookingConfirmed={() => console.log('Booking confirmed')} />
                </Card.Body>
            )}
            {!details.availability && (
            //   
            <Button
            variant="warning"
            disabled
            className='mt-3'
          >
            Unavailable
          </Button>

            )}
        </Card>
    );
}

const Vehicles = () => {
    const [allVehicles, setAllVehicles] = useState([]);
    const udata = localStorage.getItem('userData');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosInstance.get('/vehicles');
                setAllVehicles(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [allVehicles]);

    // Sort vehicles: available vehicles first, then unavailable
    const sortedVehicles = allVehicles.sort((a, b) => b.availability - a.availability);

    return (
        <>
            {udata ? (
                <UserLayout>
                    <div className='mx-5'>
                        {sortedVehicles.length > 0 ? (
                            <div className='d-flex flex-wrap justify-content-start'>
                                {sortedVehicles.map((vehicle) => (
                                    <div key={vehicle._id} className='col-lg-3 col-md-6 col-sm-12'>
                                        <VehicleCard details={vehicle} />
                                    </div>
                                ))}
                            </div>
                        ) : ( loading? <Loadingpage />:(
                            <div className='text-center fs-4 my-5'>
                                🚗 No Vehicles Today! 🚗
                                <br />
                                It looks like our vehicles are all out on adventures. Check back soon for some exciting new rides!
                            </div>)
                        )}
                    </div>
                </UserLayout>
            ) : (
                <UnAuthorizedPage />
            )}
        </>
    );
};

export default Vehicles;