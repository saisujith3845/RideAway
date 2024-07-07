import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import Header from './Header';
import AdminHeader from '../admin/AdminHeader';

const UserInfo = () => {
    const { user_id } = useParams();
    const [Userdata, setUserdata] = useState({name:"" });

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await axiosInstance.get(`/users/${user_id}`);
                setUserdata(response.data);
            } catch (error) {
                console.error("Error fetching user details", error);
            }
        };

        getDetails();
    }, [user_id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserdata(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/users/${user_id}`, Userdata);
            alert("Changes Saved");
        } catch (error) {
            console.error("Error updating user details", error);
        }
    };

    return (<>
       {Userdata?.isAdmin?<AdminHeader />:<Header />}
        <Container className='mt-3 w-50'>
            <h1 className='text-center'>Account Details</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                        type="text"
                        value={Userdata?Userdata.name:""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={Userdata?Userdata.email:""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        value={Userdata?Userdata.address:""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="number"
                        value={Userdata?Userdata.phone:""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="warning" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
        </>
    );
};

export default UserInfo;
