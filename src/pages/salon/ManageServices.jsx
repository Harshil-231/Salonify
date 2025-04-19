import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Replace Edit and Delete if needed
import AddServiceForm from './AddServiceForm'; // Import your form component
import axios from 'axios';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false); // State for the modal
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:3200'; // Your API base URL
    const token = localStorage.getItem('authToken'); // Assuming you store the token in local storage

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/services/getservices`);
            setServices(response.data.data); // Make sure the data is in .data.data
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Failed to load services.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchServices(); // Refresh the service list after closing the modal
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.delete(`${API_BASE_URL}/services/${id}`, config);
            fetchServices(); // Refresh services after deletion
        } catch (error) {
            console.error('Error deleting service:', error);
            setError('Failed to delete service.');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <h2>Manage Services</h2>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
                    Add Service
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="services table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Duration</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow
                                key={service._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {service.name}
                                </TableCell>
                                <TableCell align="right">{service.price}</TableCell>
                                <TableCell align="right">{service.duration}</TableCell>
                                <TableCell align="right">
                                    {/* <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton> */}
                                    <IconButton aria-label="delete" onClick={() => handleDelete(service._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Service Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogContent>
                    <AddServiceForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageServices;