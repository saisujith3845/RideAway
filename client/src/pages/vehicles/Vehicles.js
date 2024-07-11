import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utilities/axiosInstance';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Grid,
    CircularProgress,
    Slider,
    FormControl,
    InputLabel,
    Box,
    IconButton,
    Collapse
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BookingForm from '../Bookings/BookingForm';
import UnAuthorizedPage from '../utilities/UnAuthorizedPage';
import UserLayout from '../utilities/UserLayout';

function VehicleCard({ details }) {
    const imageUrl = details.img ? `data:${details.img.contentType};base64,${details.img.data}` : "logofinal.png";
    const cardClasses = details.availability ? '' : 'opacity-50';

    return (
        <Card
            sx={{
                width: 300,
                height: 400,
                margin: 2,
                position: 'relative',
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)'
                }
            }}
            className={cardClasses}
        >
            <Link to={`/vehicles/${details._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                    component="img"
                    height="157"
                    image={imageUrl}
                    alt="Vehicle image"
                />
                <CardContent className='text-center'>
                    <Typography variant="h5">{details.make} {details.model}</Typography>
                    <Typography variant="subtitle1">{details.fuelType} {details.year}</Typography>
                    <Typography variant="h6">₹{details.rentPerHrs} per hour</Typography>
                </CardContent>
            </Link>
            {details.availability ? (
                <CardContent className='text-center'>
                    <BookingForm vehicleId={details._id} onBookingConfirmed={() => console.log('Booking confirmed')} />
                </CardContent>
            ) : (
                <Button variant="contained" disabled className='mt-3'>
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
    const [searchQuery, setSearchQuery] = useState('');
    const [fuelTypeFilter, setFuelTypeFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [vehicleTypeFilter, setVehicleTypeFilter] = useState('');
    const [filtersExpanded, setFiltersExpanded] = useState(false);

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
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFuelTypeFilterChange = (event) => {
        setFuelTypeFilter(event.target.value);
    };

    const handleColorFilterChange = (event) => {
        setColorFilter(event.target.value);
    };

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleVehicleTypeFilterChange = (event) => {
        setVehicleTypeFilter(event.target.value);
    };

    const filteredVehicles = allVehicles.filter(vehicle => {
        const matchesSearch = vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFuelType = fuelTypeFilter === '' || vehicle.fuelType === fuelTypeFilter;
        const matchesColor = colorFilter === '' || vehicle.color === colorFilter;
        const matchesPriceRange = vehicle.rentPerHrs >= priceRange[0] && vehicle.rentPerHrs <= priceRange[1];
        const matchesVehicleType = vehicleTypeFilter === '' || vehicle.type === vehicleTypeFilter;

        return matchesSearch && matchesFuelType && matchesColor && matchesPriceRange && matchesVehicleType;
    });

    const sortedVehicles = filteredVehicles.sort((a, b) => b.availability - a.availability);

    return (
        <>
            {udata ? (
                <UserLayout>
                    <Box sx={{ mx: 5, mt: 3 }}>
                        <Grid container spacing={2} alignItems="center" className='mb-3'>
                            <Grid item xs={10} sm={8} md={6}>
                                <TextField
                                    fullWidth
                                    label='Search by make or model'
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={6} textAlign="right">
                                <IconButton onClick={() => setFiltersExpanded(!filtersExpanded)} aria-label="expand filters">
                                    <FilterListIcon />
                                    <Typography variant="body2" style={{ marginLeft: '0.5em' }}>Filters</Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Collapse in={filtersExpanded}>
                            <Grid container spacing={3} className='mb-3'>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Fuel Type</InputLabel>
                                        <Select
                                            value={fuelTypeFilter}
                                            onChange={handleFuelTypeFilterChange}
                                            label='Fuel Type'
                                        >
                                            <MenuItem value=''>All Fuel Types</MenuItem>
                                            <MenuItem value='petrol'>Petrol</MenuItem>
                                            <MenuItem value='diesel'>Diesel</MenuItem>
                                            <MenuItem value='electric'>Electric</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Color</InputLabel>
                                        <Select
                                            value={colorFilter}
                                            onChange={handleColorFilterChange}
                                            label='Color'
                                        >
                                            <MenuItem value=''>All Colors</MenuItem>
                                            <MenuItem value='Red'>Red</MenuItem>
                                            <MenuItem value='Blue'>Blue</MenuItem>
                                            <MenuItem value='Black'>Black</MenuItem>
                                            <MenuItem value='White'>White</MenuItem>
                                            <MenuItem value='Gray'>Gray</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Vehicle Type</InputLabel>
                                        <Select
                                            value={vehicleTypeFilter}
                                            onChange={handleVehicleTypeFilterChange}
                                            label='Vehicle Type'
                                        >
                                            <MenuItem value=''>All Types</MenuItem>
                                            <MenuItem value='car'>Car</MenuItem>
                                            <MenuItem value='bike'>Bike</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography gutterBottom>Price Range per hour</Typography>
                                    <Slider
                                        value={priceRange}
                                        onChange={handlePriceRangeChange}
                                        valueLabelDisplay="auto"
                                        step={100}
                                        min={0}
                                        max={10000}
                                        sx={{
                                            color: '#FFC107',
                                            height: 8,
                                            '& .MuiSlider-thumb': {
                                                width: 24,
                                                height: 24,
                                                '&:hover, &.Mui-focusVisible': {
                                                    boxShadow: '0px 0px 0px 8px rgba(255, 255, 0, 0.16)',
                                                },
                                            },
                                            '& .MuiSlider-valueLabel': {
                                                backgroundColor: 'yellow',
                                                color: 'black',
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Collapse>
                        {sortedVehicles.length > 0 ? (
                            <Grid container spacing={3}>
                                {sortedVehicles.map((vehicle) => (
                                    <Grid item key={vehicle._id} xs={12} sm={6} md={4} lg={3}>
                                        <VehicleCard details={vehicle} />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (loading ? (
                            <Box className='text-center my-5'>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box className='text-center fs-4 my-5'>
                                🚗 No Vehicles Today! 🚗
                                <br />
                                It looks like our vehicles are all out on adventures. Check back soon for some exciting new rides!
                            </Box>)
                        )}
                    </Box>
                </UserLayout>
            ) : (
                <UnAuthorizedPage />
            )}
        </>
    );
};

export default Vehicles;
