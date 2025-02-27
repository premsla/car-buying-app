import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SettingsIcon from '@mui/icons-material/Settings';
import PurchaseRequestForm from '../components/PurchaseRequestForm';

const CarDetails = () => {
  const [loanAmount, setLoanAmount] = useState('659999');
  const [downPayment, setDownPayment] = useState('100000');
  const [period, setPeriod] = useState('60');
  const [interestRate, setInterestRate] = useState('7.5');

  const carFeatures = [
    'A/C: Front',
    'Central locking',
    'Leather',
    'Sports package',
    'Navigation system',
    'Front fog light',
    'Rain sensing wipe',
    'Rear Spoilers',
    'Sun roof',
    'Power steering',
    'Vanity mirror',
    'Trunk Light',
  ];

  const carSpecs = [
    { label: 'Condition', value: 'New' },
    { label: 'Stock Number', value: 'N8990' },
    { label: 'Fuel Type', value: 'Petrol' },
    { label: 'VIN Number', value: '84HKI92KJDC' },
    { label: 'Doors', value: '4' },
    { label: 'Year', value: '2023' },
    { label: 'Colour', value: 'Black' },
    { label: 'Mileage', value: '28,000 km' },
    { label: 'Seats', value: '5' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'City MPG', value: '18' },
    { label: 'Engine Size', value: '4.8 L' },
    { label: 'Highway MPG', value: '28' },
    { label: 'Drive type', value: '2WD' },
  ];

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 1200;
    const numberOfPayments = parseFloat(period);
    
    const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
      / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Car Images */}
          <Box sx={{ mb: 4 }}>
            <img
              src="https://example.com/mercedes-c-class.jpg"
              alt="Mercedes-Benz C Class"
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          </Box>

          {/* Car Title and Price */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Mercedes-Benz C Class 2023
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Typography variant="h5" color="primary">
                ₹659,999
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ₹859,999
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography color="text.secondary" paragraph>
              There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in some form, by injected humour, or randomised words which don't look even slight believable. If you are going to use a passa There are many variations of passages of Lorem Ipsum available, but majority have suffered teration in some form look even by injected humour, or randomised...
            </Typography>
          </Box>

          {/* Car Overview */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Car Overview
              </Typography>
              <Grid container spacing={2}>
                {carSpecs.map((spec, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {spec.label}
                      </Typography>
                      <Typography variant="body1">
                        {spec.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Features */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Grid container spacing={2}>
                {carFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Chip
                      label={feature}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Contact Form */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Schedule Test Drive
              </Typography>
              <Box component="form" sx={{ '& > :not(style)': { mb: 2 } }}>
                <TextField fullWidth label="Name" variant="outlined" />
                <TextField fullWidth label="Email Address" variant="outlined" />
                <TextField fullWidth label="Phone number" variant="outlined" />
                <Button variant="contained" color="primary" fullWidth>
                  Send message
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Location */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="primary" />
                <Typography>
                  4517 Washington Ave. Manchester, Kentucky 39495
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Loan Calculator */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Loan Calculator
              </Typography>
              <Box sx={{ '& > :not(style)': { mb: 2 } }}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  type="number"
                />
                <TextField
                  fullWidth
                  label="Down Payment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  type="number"
                />
                <TextField
                  fullWidth
                  label="Period (months)"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  type="number"
                />
                <TextField
                  fullWidth
                  label="Interest Rate (%)"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  type="number"
                />
                <Typography variant="h6" align="center">
                  Monthly Payment: ₹{calculateLoan().toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Calculate
                  </Button>
                  <Button variant="outlined" color="primary" fullWidth>
                    Reset
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Purchase Request */}
          <Box sx={{ mt: 2 }}>
            {!showRequestForm && !requestSuccess && (
              <Button 
                variant="contained" 
                onClick={() => setShowRequestForm(true)}
              >
                Request to Purchase
              </Button>
            )}

            {showRequestForm && (
              <PurchaseRequestForm 
                carId="12345" 
                onSuccess={() => {
                  setRequestSuccess(true);
                  setShowRequestForm(false);
                }}
              />
            )}

            {requestSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Your purchase request has been submitted successfully!
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
