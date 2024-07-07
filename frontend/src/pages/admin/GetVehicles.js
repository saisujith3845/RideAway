import React, { useEffect, useState } from "react";
import axiosInstance from "../utilities/axiosInstance";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Layout from "./Layout";

const GetVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    type: "",
    color: "",
    fuelType: "",
    rentPerHrs: "",
    availability: true,
    img: null,
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get('/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
        alert('Something went wrong, please try again.');
      }
    };

    fetchVehicles();
  }, [vehicles]);

  const deleteVehicle = async (id) => {
    try {
      await axiosInstance.delete(`/vehicles/${id}`);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert('Error deleting vehicle, please try again.');
    }
  };

  const openEditModal = (vehicle) => {
    setFormData({
      _id: vehicle._id,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      type: vehicle.type,
      color: vehicle.color,
      fuelType: vehicle.fuelType,
      rentPerHrs: vehicle.rentPerHrs,
      availability: vehicle.availability,
      img: vehicle.img,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0]
    });
  };

  const updateVehicle = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      if (formData._id) {
        await axiosInstance.put(`/vehicles/${formData._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const updatedVehicles = vehicles.map(vehicle =>
          vehicle._id === formData._id ? formData : vehicle
        );
        setVehicles(updatedVehicles);
      } else {
        const response = await axiosInstance.post("/vehicles", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setVehicles([...vehicles, response.data]);
      }
      setShowModal(false);
      setFormData({
        make: "",
        model: "",
        year: "",
        type: "",
        color: "",
        fuelType: "",
        rentPerHrs: "",
        availability: true,
        img: null,
      });
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert('Error updating vehicle, please try again.');
    }
  };

  const openAddModal = () => {
    setFormData({
      make: "",
      model: "",
      year: "",
      type: "",
      color: "",
      fuelType: "",
      rentPerHrs: "",
      availability: true,
      img: null,
    });
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mb-3">Vehicle Details</h1>
        <hr />
        <Button variant="warning" onClick={openAddModal} className="mb-3">
          Add Vehicle
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Type</th>
              <th>Color</th>
              <th>Fuel Type</th>
              <th>Rent Per Hour</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, i) => (
              <tr key={vehicle._id}>
                <td>{i + 1}</td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.fuelType}</td>
                <td>{vehicle.rentPerHrs}</td>
                <td>{vehicle.availability ? "Available" : "Unavailable"}</td>
                <td>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteVehicle(vehicle._id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    variant="warning" 
                    className="mx-2" 
                    onClick={() => openEditModal(vehicle)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{formData._id ? "Edit Vehicle" : "Add Vehicle"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formMake">
                <Form.Label>Make</Form.Label>
                <Form.Control 
                  type="text" 
                  name="make" 
                  value={formData.make} 
                  onChange={handleInputChange} 
                  required
                />
              </Form.Group>

              <Form.Group controlId="formModel">
                <Form.Label>Model</Form.Label>
                <Form.Control 
                  type="text" 
                  name="model" 
                  value={formData.model} 
                  onChange={handleInputChange} 
                  required
                />
              </Form.Group>

              <Form.Group controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control 
                  type="number" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleInputChange} 
                  required
                />
              </Form.Group>

              <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control 
                  as="select" 
                  name="type" 
                  value={formData.type} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formColor">
                <Form.Label>Color</Form.Label>
                <Form.Control 
                  type="text" 
                  name="color" 
                  value={formData.color} 
                  onChange={handleInputChange} 
                  required
                />
              </Form.Group>

              <Form.Group controlId="formFuelType">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Control 
                  as="select" 
                  name="fuelType" 
                  value={formData.fuelType} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRentPerHour">
                <Form.Label>Rent Per Hour</Form.Label>
                <Form.Control 
                  type="number" 
                  name="rentPerHrs" 
                  value={formData.rentPerHrs} 
                  onChange={handleInputChange} 
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAvailability">
                <Form.Check 
                  type="checkbox" 
                  name="availability" 
                  label="Available" 
                  checked={formData.availability} 
                  onChange={(e) => setFormData({...formData, availability: e.target.checked})} 
                  required
                />
              </Form.Group>

              <Form.Group controlId="formImg">
                <Form.Label>Image</Form.Label>
                <Form.Control 
                  type="file" 
                  name="img" 
                  onChange={handleFileChange} 
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="warning" onClick={updateVehicle}>
              {formData._id ? "Save Changes" : "Add Vehicle"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default GetVehicles;
