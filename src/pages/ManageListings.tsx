import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Slider,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  IconButton,
} from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Car } from '../store/slices/carsSlice';

const ManageListings = () => {
  const [carType, setCarType] = useState('new');
  const [priceRange, setPriceRange] = useState<number[]>([1000, 5000]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [body, setBody] = useState('');
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsRef = collection(db, 'cars');
        const snapshot = await getDocs(carsRef);
        const carsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Car[];
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleCarTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newCarType: string,
  ) => {
    if (newCarType !== null) {
      setCarType(newCarType);
    }
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Manage Listings
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            List of FAQs
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{ 
            bgcolor: '#dc3545',
            '&:hover': { bgcolor: '#c82333' },
            borderRadius: '8px',
            textTransform: 'none'
          }}
        >
          Add Car
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <ToggleButtonGroup
          value={carType}
          exclusive
          onChange={handleCarTypeChange}
          sx={{ mb: 3 }}
        >
          <ToggleButton 
            value="new" 
            sx={{ 
              borderRadius: '20px',
              px: 3,
              mr: 1,
              '&.Mui-selected': {
                bgcolor: '#dc3545',
                color: 'white',
                '&:hover': {
                  bgcolor: '#c82333',
                }
              }
            }}
          >
            New cars
          </ToggleButton>
          <ToggleButton 
            value="used"
            sx={{ 
              borderRadius: '20px',
              px: 3,
              '&.Mui-selected': {
                bgcolor: '#dc3545',
                color: 'white',
                '&:hover': {
                  bgcolor: '#c82333',
                }
              }
            }}
          >
            Used cars
          </ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              sx={{ bgcolor: '#f8f9fa', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Models"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              sx={{ bgcolor: '#f8f9fa', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              sx={{ bgcolor: '#f8f9fa', borderRadius: 1 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ px: 2 }}>
          <Typography gutterBottom>Set price range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            min={1000}
            max={5000}
            valueLabelDisplay="auto"
            sx={{
              color: '#dc3545',
              '& .MuiSlider-thumb': {
                bgcolor: '#dc3545',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">₹{priceRange[0]}</Typography>
            <Typography variant="body2">₹{priceRange[1]}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Car Listings */}
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} key={car.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="250"
                image={car.imageUrl}
                alt={`${car.make} ${car.model}`}
              />
              <CardContent>
                <Typography variant="subtitle2" color="error" gutterBottom>
                  Mini cooper 3
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {car.make} {car.model} {car.year}
                </Typography>
                <Typography variant="h6" color="error" gutterBottom>
                  ₹ {car.price.toLocaleString()}
                </Typography>
                <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalGasStationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {car.fuelType}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SpeedIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {car.mileage}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SettingsIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {car.transmission}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageListings;
