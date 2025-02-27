import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Link,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import DashboardLayout from '../components/Layout/DashboardLayout';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    address: '',
    reraId: '',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving profile data:', formData);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Personal Details Section */}
          <Paper sx={{ p: 4, bgcolor: 'white' }}>
            <Typography variant="h5" gutterBottom fontWeight={500}>
              Profile
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Personal details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </Grid>
            </Grid>

            {/* Company Details Section */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Company details <Typography component="span" color="text.secondary" variant="body2">(These details will be reflected on the website)</Typography>
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company email"
                  name="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  placeholder="Enter company email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company Phone number"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  placeholder="Enter company phone number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your company address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="RERA ID (Optional)"
                  name="reraId"
                  value={formData.reraId}
                  onChange={handleChange}
                  placeholder="Enter your ID"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="inherit">
                Reset
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Paper>

          {/* Settings Section */}
          <Paper sx={{ p: 4, bgcolor: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              Change/Reset password
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                />
              </Grid>
              <Grid item xs={12}>
                <Link
                  href="#"
                  color="success.main"
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  Forgot password ?
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>
    </DashboardLayout>
  );
};

export default Profile;
