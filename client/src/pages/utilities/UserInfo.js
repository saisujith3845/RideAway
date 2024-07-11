import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import UserLayout from './UserLayout';

const UserInfo = () => {
    const { user_id } = useParams();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await axiosInstance.get(`/users/${user_id}`);
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details", error);
                setLoading(false);
            }
        };

        getDetails();
    }, [user_id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/users/${user_id}`, userData);
            alert("Changes Saved");
        } catch (error) {
            console.error("Error updating user details", error);
        }
    };

    if (loading) {
        return <UserLayout><Container className='mt-3 w-50'><h1>Loading...</h1></Container></UserLayout>;
    }

    return (
        <UserLayout>
            <Container className='mt-3 w-50'>
                <h1 className='text-center mb-4 fw-bold'>Account Details</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label><strong>User Name</strong></Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label><strong>Email address</strong></Form.Label>
                        <Form.Control
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label><strong>Address</strong></Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label><strong>Phone Number</strong></Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="warning" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Container>
        </UserLayout>
    );
};

export default UserInfo;
