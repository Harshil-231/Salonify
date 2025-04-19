import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { FaStore, FaUsers, FaUserTie, FaCalendarAlt, FaBars } from 'react-icons/fa'; // Import icons

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.2s',
  backgroundColor: '#f8f0e3', // Light cream color
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[5],
  },
}));

const DashboardContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: '#fef9ef', // Cream background for the whole page
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: theme.shadows[2],
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#f8f0e3', // Light cream color for tables
}));

const AdminDashboard = () => {
  const [salons, setSalons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const salonsResponse = await axios.get('http://localhost:3200/salons', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalons(salonsResponse.data.data);

        const customersResponse = await axios.get('http://localhost:3200/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(customersResponse.data.data);

        const ownersResponse = await axios.get('http://localhost:3200/owners', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwners(ownersResponse.data.data);

        const appointmentsResponse = await axios.get('http://localhost:3200/getallappointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(appointmentsResponse.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <Alert severity="error">{error}</Alert>
      </DashboardContainer>
    );
  }

  const handleComponentClick = (componentName) => {
    setSelectedComponent(componentName);
    handleMobileMenuClose(); // Close mobile menu after selection
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const renderComponent = () => {
    let tableTitle = '';
    let tableHeaders = [];
    let tableRows = [];

    switch (selectedComponent) {
      case 'salons':
        tableTitle = 'Salons';
        tableHeaders = ['Name', 'Address', 'Contact'];
        tableRows = salons.map((salon) => (
          <TableRow key={salon._id}>
            <TableCell component="th" scope="row">
              {salon.salonName}
            </TableCell>
            <TableCell>{salon.address}</TableCell>
            <TableCell component="th" scope="row">
              {salon.phone}
            </TableCell>
          </TableRow>
        ));
        break;
      case 'customers':
        tableTitle = 'Customers';
        tableHeaders = ['FirstName', 'LastName', 'Email'];
        tableRows = customers.map((customer) => (
          <TableRow key={customer._id}>
            <TableCell component="th" scope="row">
              {customer.firstName}
            </TableCell>
            <TableCell component="th" scope="row">
              {customer.lastName}
            </TableCell>
            <TableCell>{customer.email}</TableCell>
          </TableRow>
        ));
        break;
      case 'owners':
        tableTitle = 'Owners';
        tableHeaders = ['FirstName', 'LastName', 'Email'];
        tableRows = owners.map((owner) => (
          <TableRow key={owner._id}>
            <TableCell component="th" scope="row">
              {owner.firstName}
            </TableCell>
            <TableCell component="th" scope="row">
              {owner.lastName}
            </TableCell>
            <TableCell>{owner.email}</TableCell>
          </TableRow>
        ));
        break;
      case 'appointments':
        tableTitle = 'Appointments';
        tableHeaders = ['Salon', 'Date', 'Time'];
        tableRows = appointments.map((appointment) => (
          <TableRow key={appointment._id}>
            <TableCell>{appointment.salonName}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
          </TableRow>
        ));
        break;
      default:
        return null; // Or a default message/component
    }

    return (
      <>
        {selectedComponent && (
          <Typography variant="h6" gutterBottom>
            {tableTitle}
          </Typography>
        )}
        <StyledTableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label={`${tableTitle} table`}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </StyledTableContainer>
      </>
    );
  };

  return (
    <DashboardContainer>
      <Typography variant="h4" component="h1" gutterBottom align="center" className="text-yellow-950">
        Admin Dashboard
      </Typography>

      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ mb: 2 }}
          >
            <FaBars />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={() => handleComponentClick('salons')}>Salons</MenuItem>
            <MenuItem onClick={() => handleComponentClick('customers')}>Customers</MenuItem>
            <MenuItem onClick={() => handleComponentClick('owners')}>Owners</MenuItem>
            <MenuItem onClick={() => handleComponentClick('appointments')}>Appointments</MenuItem>
          </Menu>
        </>
      ) : (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard onClick={() => handleComponentClick('salons')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaStore size={40} color="#1976d2" />
                <Typography variant="h6" component="div" mt={1}>
                  Salons
                </Typography>
                <Typography color="textSecondary">{salons.length} Salons</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard onClick={() => handleComponentClick('customers')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaUsers size={40} color="#4caf50" />
                <Typography variant="h6" component="div" mt={1}>
                  Customers
                </Typography>
                <Typography color="textSecondary">{customers.length} Customers</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard onClick={() => handleComponentClick('owners')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaUserTie size={40} color="#ff9800" />
                <Typography variant="h6" component="div" mt={1}>
                  Owners
                </Typography>
                <Typography color="textSecondary">{owners.length} Owners</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard onClick={() => handleComponentClick('appointments')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaCalendarAlt size={40} color="#e91e63" />
                <Typography variant="h6" component="div" mt={1}>
                  Appointments
                </Typography>
                <Typography color="textSecondary">{appointments.length} Appointments</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      )}

      <Box mt={3}>{renderComponent()}</Box>
    </DashboardContainer>
  );
};

export default AdminDashboard;