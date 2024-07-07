import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utilities/axiosInstance';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.css";
import BookingForm from '../Bookings/BookingForm';
import Header from '../utilities/Header';
import UnAuthorizedPage from '../utilities/UnAuthorizedPage';

function VehicleCard({ details }) {
    const imageUrl = details.img ? `data:${details.img.contentType};base64,${details.img.data}` : "logofinal.png";

    return (
        <Card style={{ width: "18rem" }} className='m-3'>
            <Link to={`/vehicles/${details._id}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={imageUrl} style={{width:'288px',height:'157px'}}/>
                <Card.Body className='text-center bg-secondary-subtle'>
                    <Card.Title className='fs-3'>{details.make} {details.model}</Card.Title>
                    <Card.Text className='fs-6'>{details.fuelType} {details.year}</Card.Text>
                    <Card.Text className='fs-5'>
                        ${details.rentPerHrs} per hour
                    </Card.Text>
                </Card.Body>
            </Link>
            <Card.Body className='text-center bg-secondary-subtle'>
                <BookingForm vehicleId={details._id} onBookingConfirmed={() => console.log('Booking confirmed')} />
            </Card.Body>
        </Card>
    );
}

const Vehicles = () => {
    const [allVehicles, setAllVehicles] = useState([]);
   
    const udata = localStorage.getItem('userData');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosInstance.get('/vehicles');
                setAllVehicles(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        fetchData();
        
    }, [allVehicles]);

    const availableVehicles = allVehicles.filter(vehicle => vehicle.availability);

    return (
        <>
            {udata ? (
                <>
                    <Header  />
                    <div className='mx-5'>
                        <div className='d-flex flex-wrap justify-content-start'>
                            {availableVehicles.map((vehicle) => (
                                <div key={vehicle._id} className='col-lg-3 col-md-6 col-sm-12'>
                                    <VehicleCard details={vehicle} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <UnAuthorizedPage />
            )}
        </>
    );
};

export default Vehicles;
