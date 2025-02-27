import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Import the image
import carImage from '../../assets/orange-car.jpg';

const CarspaceLogin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '+91'
  });

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Handle login/signup logic here
      navigate('/');
    } catch (error) {
      setError('Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          overflow: 'hidden',
          width: '800px',
          margin: 2,
        }
      }}
    >
      <Box sx={{ display: 'flex', height: '500px' }}>
        {/* Left side - Car Image */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            backgroundImage: `url(${carImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
              zIndex: 1
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
              zIndex: 1,
              backdropFilter: 'blur(3px)'
            }
          }}
        />

        {/* Right side - Login Form */}
        <Box sx={{ flex: 1, p: 4, position: 'relative', bgcolor: 'white' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #0066FF, #FF0000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Carspace
            </Typography>
          </Box>

          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="text"
              sx={{
                flex: 1,
                color: 'text.primary',
                '&:hover': { backgroundColor: 'transparent' },
                borderBottom: '2px solid #0066FF',
              }}
            >
              Login
            </Button>
            <Button
              variant="text"
              sx={{
                flex: 1,
                color: 'text.secondary',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              Sign up
            </Button>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Enter your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Enter your Email ID"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <FormControl sx={{ width: '30%' }}>
                <InputLabel>Code</InputLabel>
                <Select
                  value={formData.countryCode}
                  label="Code"
                  onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                >
                  <MenuItem value="+91">+91</MenuItem>
                  <MenuItem value="+1">+1</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Enter your Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#0066FF',
                '&:hover': {
                  backgroundColor: '#0052CC',
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Continue'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CarspaceLogin;
