import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Styled Components for improved aesthetics
const FormContainer = styled(Box)({
    maxWidth: 600,
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#fff',
});

const StyledTextField = styled(TextField)({
    marginBottom: '20px',
});

const StyledFormControl = styled(FormControl)({
    marginBottom: '20px',
});

const AddServiceForm = () => {
    const [formData, setFormData] = useState({
        salonId: '', // This will be pre-populated
        name: '',
        price: '',
        duration: '',
        description: '',
        categoryId: '',
    });

    const [salons, setSalons] = useState([]); // Store only the owner's salons
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Replace with your actual API base URL
    const API_BASE_URL = 'http://localhost:3200';

    // Fetch Salons and Categories on component mount
    useEffect(() => {
        const fetchSalonsAndCategories = async () => {
            setLoading(true);
            try {
                // 1. Get the owner's salons
                const token = localStorage.getItem('authToken'); // Example: Get from local storage

                console.log("My token:", token)

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                console.log("This is config:", config)

                const salonsResponse = await axios.get(`${API_BASE_URL}/salons`, config); // Assuming you have an endpoint like this
                setSalons(salonsResponse.data.data); //Store only the salons owned by the owner

                // 2. Get Categories (no auth needed usually)
                const categoriesResponse = await axios.get(`${API_BASE_URL}/category/getallcategories`);
                setCategories(categoriesResponse.data);

                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load salons and categories.');
            } finally {
                setLoading(false);
            }
        };

        fetchSalonsAndCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Replace 'YOUR_AUTH_TOKEN' with the actual way you retrieve the token
            const token = localStorage.getItem('authToken'); // Example: Get from local storage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            };

            const response = await axios.post(`${API_BASE_URL}/services/addservice`, formData, config);

            setSuccess('Service added successfully!');
            setFormData({ // Clear the form on success
                salonId: '',
                name: '',
                price: '',
                duration: '',
                description: '',
                categoryId: '',
            });
        } catch (err) {
            console.error('Error adding service:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Failed to add service. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <h2>Add New Service</h2>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <form onSubmit={handleSubmit}>
                {/* <StyledFormControl fullWidth required>
                    <InputLabel id="salonId-label">Salon</InputLabel>
                    <Select
                        labelId="salonId-label"
                        id="salonId"
                        name="salonId"
                        value={formData.salonId}
                        label="Salon"
                        onChange={handleChange}
                    >
                        {salons.map((salon) => (
                            <MenuItem key={salon._id} value={salon._id}>
                                {salon.salonName}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl> */}

                <StyledFormControl fullWidth required>
                    <InputLabel id="categoryId-label">Category</InputLabel>
                    <Select
                        labelId="categoryId-label"
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        label="Category"
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>

                <StyledTextField
                    fullWidth
                    label="Service Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <StyledTextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <StyledTextField
                    fullWidth
                    label="Duration (minutes)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />

                <StyledTextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Service'}
                </Button>
            </form>
        </FormContainer>
    );
};

export default AddServiceForm;