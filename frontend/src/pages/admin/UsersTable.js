import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axiosInstance from '../utilities/axiosInstance';
import Layout from './Layout';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      const filteredUsers = response.data.filter(user => !user.isAdmin); // Filter users based on isAdmin property
      setUsers(filteredUsers);
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('403 Forbidden: You do not have permission to access this resource.');
      } else {
        setError('Error fetching users.');
      }
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/admin/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
        setError(null); // Clear any previous errors    
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('403 Forbidden: You do not have permission to delete this user.');
        } else {
          setError('Error deleting user.');
        }
        console.error('Error deleting user:', error);
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

  return (
    <Layout>
      <Container>
        <h1 className="mt-4 mb-4 display-5 text-center">Users</h1>
        {users.length === 0 ? (
          <Alert variant="warning" className="mt-5 text-center">
            <h4>No Users Found, Admin!</h4>
            <p>Our user pool is a bit quiet right now. Let's gear up to welcome more members soon!</p>
          </Alert>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteUser(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Layout>
  );
};

export default UsersTable;
