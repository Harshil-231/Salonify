import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    TableSortLabel,
    Box,
    Toolbar,
    IconButton,
    Tooltip,
    styled,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import SalonForm from './SalonForm'; // Import the combined form

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '& td, & th': {
        padding: '16px',
    },
}));

const ManageSalons = () => {
    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('salonName');
    const [openModal, setOpenModal] = useState(false);
    const [editingSalon, setEditingSalon] = useState(null); // For editing
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [salonToDelete, setSalonToDelete] = useState(null);

    const fetchSalons = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const ownerId = localStorage.getItem('id'); // Retrieve owner ID from local storage
            const response = await axios.get(`http://localhost:3200/salons/owner/${ownerId}`, { // Use the new route
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Full API Response:", response); // **Existing log**
            console.log("response.data.data:", response.data.data); // Existing log
            const salonData = Array.isArray(response.data.data) ? response.data.data : [];
            setSalons(salonData);
            console.log("Value of salons AFTER setSalons:", salons); // **ADD THIS LINE**

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch salons.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalons();
    }, []);

    const handleSort = (property) => () => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedSalons = (() => {
        console.log("Value of salons BEFORE slice:", salons);
        console.log("Type of salons BEFORE slice:", typeof salons);
        if (!Array.isArray(salons)) {
            console.error("salons is NOT an array!");
            return [];
        }
        return salons.slice().sort((a, b) => {
            if (!a || !b) {
                console.warn("Encountered null or undefined salon object during sort.");
                return 0; // Treat as equal for sorting purposes
            }
            const isAsc = order === 'asc';
            if (orderBy === 'salonName') {
                return isAsc
                    ? (a.salonName || '').localeCompare(b.salonName || '')  // Handle potentially missing salonName
                    : (b.salonName || '').localeCompare(a.salonName || '');
            } else if (orderBy === 'address') {
                return isAsc
                    ? (a.address || '').localeCompare(b.address || '')
                    : (b.address || '').localeCompare(a.address || '');
            } else if (orderBy === 'phone') {
                return isAsc
                    ? (a.phone || '').localeCompare(b.phone || '')
                    : (b.phone || '').localeCompare(a.phone || '');
            }
            return 0;
        });
    })();

    const handleOpenModal = () => {
        setEditingSalon(null); // Reset for adding
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingSalon(null);
    };

    const handleEditSalon = (salon) => {
        setEditingSalon(salon);
        setOpenModal(true);
    };

    const handleDeleteSalon = (salonId) => {
        setSalonToDelete(salonId);
        setDeleteConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
        setDeleteConfirmationOpen(false);
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3200/salons/${salonToDelete}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchSalons(); // Refresh the salon list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete salon.');
        } finally {
            setLoading(false);
            setSalonToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmationOpen(false);
        setSalonToDelete(null);
    };

    const handleFormSubmit = () => {
        handleCloseModal(); // Close the modal after submission
        fetchSalons(); // Refresh salons after add/edit
    };


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                {error}
            </Alert>
        );
    }

    const renderNoSalonsFound = () => (
        <Box m={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="300px">
            <Typography variant="body1" sx={{ mb: 2 }}>
                No salons found. Add one now!
            </Typography>
            <Tooltip title="Add New Salon">
                <IconButton color="primary" onClick={handleOpenModal}>
                    <AddIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const renderSalonsTable = () => {
        console.log("Contents of sortedSalons BEFORE rendering:", sortedSalons);  // **ADD THIS LINE**

        return(
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="h6">Manage Your Salons</Typography>
                <Tooltip title="Add New Salon">
                    <IconButton color="primary" onClick={handleOpenModal}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="salons table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={orderBy === 'salonName'}
                                    direction={orderBy === 'salonName' ? order : 'asc'}
                                    onClick={handleSort('salonName')}
                                >
                                    Salon Name
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <TableSortLabel
                                    active={orderBy === 'address'}
                                    direction={orderBy === 'address' ? order : 'asc'}
                                    onClick={handleSort('address')}
                                >
                                    Address
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <TableSortLabel
                                    active={orderBy === 'phone'}
                                    direction={orderBy === 'phone' ? order : 'asc'}
                                    onClick={handleSort('phone')}
                                >
                                    Contact
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedSalons.map((salon) => (
                            <StyledTableRow key={salon._id}>
                                <TableCell component="th" scope="row">
                                    {salon.salonName}
                                </TableCell>
                                <TableCell align="left">{salon.address}</TableCell>
                                <TableCell align="left">{salon.phone}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Edit Salon">
                                        <IconButton onClick={() => handleEditSalon(salon)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Salon">
                                        <IconButton onClick={() => handleDeleteSalon(salon._id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
    }
    return (
        <Box m={2}>
            {salons.length === 0 ? renderNoSalonsFound() : renderSalonsTable()}

            {/* Add/Edit Salon Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="salon-form-dialog">
                <DialogTitle id="salon-form-dialog">{editingSalon ? 'Edit Salon' : 'Add Salon'}</DialogTitle>
                <DialogContent>
                    <SalonForm
                        salon={editingSalon}
                        onClose={handleCloseModal}
                        onSubmit={handleFormSubmit} // Callback after submit
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirmationOpen}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Salon?"}</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this salon?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageSalons;