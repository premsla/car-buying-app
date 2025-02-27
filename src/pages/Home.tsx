import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  Slider,
  InputLabel,
  Stack,
  Tooltip
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Home = () => {
  const navigate = useNavigate();
  const { cars } = useCars();
  const user = useSelector((state: RootState) => state.auth.user);
  const [carStatus, setCarStatus] = useState('all');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([1000, 5000]);

  // Filter available cars
  const availableCars = cars.filter(car => car.status === 'Available');

  const handleCarStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    if (newStatus !== null) {
      setCarStatus(newStatus);
    }
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          },
          backgroundImage: 'url(https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: 600 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'white',
                letterSpacing: 2,
                mb: 2,
                display: 'block'
              }}
            >
              TRUSTED DEALER, RENTAL
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textTransform: 'uppercase'
              }}
            >
              MERCEDES BENZ
              <br />
              2023 NEW CAR
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              $180.99 <Typography variant="body1" component="span" sx={{ color: 'error.main', textDecoration: 'line-through' }}>/5000</Typography>
            </Typography>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => navigate('/listing')}
              sx={{
                borderRadius: 0,
                py: 1.5,
                px: 4,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Go To Listing
            </Button>
          </Box>
        </Container>

        {/* Search Filter Card */}
        <Paper
          sx={{
            position: 'absolute',
            right: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            p: 3,
            width: 300,
            zIndex: 2,
            borderRadius: 2,
          }}
        >
          <Stack spacing={3}>
            <ToggleButtonGroup
              value={carStatus}
              exclusive
              onChange={handleCarStatusChange}
              aria-label="car status"
              fullWidth
              sx={{
                '& .MuiToggleButton-root.Mui-selected': {
                  backgroundColor: 'error.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'error.dark',
                  },
                },
              }}
            >
              <ToggleButton value="all" sx={{ textTransform: 'none' }}>
                All Status
              </ToggleButton>
              <ToggleButton value="new" sx={{ textTransform: 'none' }}>
                New Cars
              </ToggleButton>
              <ToggleButton value="used" sx={{ textTransform: 'none' }}>
                Used Cars
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControl fullWidth>
              <InputLabel>Make</InputLabel>
              <Select
                value={make}
                label="Make"
                onChange={(e) => setMake(e.target.value)}
              >
                <MenuItem value="">All Makes</MenuItem>
                <MenuItem value="mercedes">Mercedes</MenuItem>
                <MenuItem value="bmw">BMW</MenuItem>
                <MenuItem value="audi">Audi</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Models</InputLabel>
              <Select
                value={model}
                label="Models"
                onChange={(e) => setModel(e.target.value)}
              >
                <MenuItem value="">All Models</MenuItem>
                <MenuItem value="c-class">C-Class</MenuItem>
                <MenuItem value="e-class">E-Class</MenuItem>
                <MenuItem value="s-class">S-Class</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography gutterBottom>Price</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={1000}
                max={5000}
                sx={{
                  color: 'error.main',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'white',
                    border: '2px solid currentColor',
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  1,000
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  5,000
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="error"
              fullWidth
              startIcon={<SearchIcon />}
              sx={{ borderRadius: 1 }}
            >
              2351 Cars
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* Explore Our Cars Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ color: 'red', mr: 1, fontSize: '24px' }}>|</Box>
            Explore Our Cars
          </Typography>
          <Button 
            sx={{ 
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'primary.main'
              }
            }}
          >
            View more
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {[
            { 
              title: 'Sedan', 
              image: '/sedan.png'
            },
            { 
              title: 'Campers', 
              image: '/camper.png'
            },
            { 
              title: 'Cabriolet', 
              image: '/cabriolet.png'
            },
            { 
              title: 'Pickup', 
              image: '/pickup.png'
            },
            { 
              title: 'Supercar', 
              image: '/supercar.png'
            },
            { 
              title: 'Minivans', 
              image: '/minivan.png'
            }
          ].map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box
                  component="img"
                  src={category.image}
                  alt={category.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    mb: 2
                  }}
                />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
                  {category.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Cars Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            <span style={{ color: 'red', marginRight: '8px' }}>|</span>
            Available Cars
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {availableCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card sx={{ position: 'relative', height: '100%' }}>
                <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                  <Chip label={car.type} color="primary" size="small" />
                </Box>
                <CardMedia
                  component="img"
                  height="250"
                  image={car.image || 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={car.name}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
                <CardContent>
                  <Typography color="error.main" variant="caption">
                    {car.model}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {car.name}
                  </Typography>
                  <Typography variant="h6" color="error" gutterBottom>
                    ₹ {car.price}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <DirectionsCarIcon fontSize="small" />
                      <Typography variant="caption">{car.type}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <SpeedIcon fontSize="small" />
                      <Typography variant="caption">{car.model}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <SettingsIcon fontSize="small" />
                      <Typography variant="caption">{car.status}</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button 
                    size="small" 
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                  >
                    View Details
                  </Button>
                  <IconButton size="small" color="error">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {availableCars.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No cars available at the moment
            </Typography>
          </Box>
        )}
      </Container>

      {/* Admin Quick Access */}
      {user?.role === 'admin' && (
        <Box sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20, 
          zIndex: 1000,
          bgcolor: 'background.paper',
          borderRadius: '50%',
          boxShadow: 3
        }}>
          <Tooltip title="Admin Dashboard" arrow>
            <IconButton 
              color="primary" 
              size="large"
              onClick={() => navigate('/admin')}
              sx={{ 
                p: 2,
                '&:hover': {
                  bgcolor: 'primary.light',
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default Home;
