// Modify SalonForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Alert } from '@mui/material';

const SalonForm = ({ salon, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        salonName: "",
        businessName: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "IN",
        phone: "",
        email: "",
        website: "",
        owner: "", // ADDED: Owner ID
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null); // State for form-level error

    useEffect(() => {
        if (salon) {
            setFormData(salon);
        } else {
            // Reset the form if it's a new salon
            const ownerId = localStorage.getItem("id"); // Get ownerId
            setFormData({
                salonName: "",
                businessName: "",
                address: "",
                city: "",
                state: "",
                postalCode: "",
                country: "IN",
                phone: "",
                email: "",
                website: "",
                owner: ownerId, // Set the owner ID
            });
        }
    }, [salon]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError(null); // Clear any existing error when input changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null); // Clear previous messages
        setError(null);

        try {
            const ownerId = localStorage.getItem("id");
            const token = localStorage.getItem("token");
            const url = salon
                ? `http://localhost:3200/salons/${salon._id}` //edit url
                : `http://localhost:3200/salons`; //add url

            const method = salon ? "put" : "post"; //edit or add method

            //const data = salon ? formData : { ...formData, ownerId }; //if edit not send the ownerId
            const data = formData;

            const response = await axios({
                method: method,
                url: url,
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(`Salon ${salon ? 'updated' : 'added'} successfully!`);
            onSubmit(); // Notify parent component
            console.log("Success:", response.data);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to save salon.");
            console.error("Error:", err);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <TextField
                label="Salon Name"
                name="salonName"
                value={formData.salonName}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Business Name (if different)"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="State/Province"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Postal Code/ZIP"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Website (if available)"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                    labelId="country-label"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value="IN">India</MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                    <MenuItem value="CA">Canada</MenuItem>
                    <MenuItem value="GB">United Kingdom</MenuItem>
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </Box>
    );
};

export default SalonForm;