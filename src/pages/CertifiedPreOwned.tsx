import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  imageUrl: string;
  featured?: boolean;
}

const CertifiedPreOwned = () => {
  const navigate = useNavigate();
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [zipCode, setZipCode] = useState('');

  // This would typically come from your Firebase database
  const cars: Car[] = [
    {
      id: '1',
      make: 'Chevrolet',
      model: 'Suburban',
      year: 2021,
      price: 27000,
      mileage: 15000,
      fuelType: 'Petrol',
      transmission: 'Auto',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3',
      featured: true,
    },
    {
      id: '2',
      make: 'Chevrolet',
      model: 'Suburban',
      year: 2021,
      price: 27000,
      mileage: 45000,
      fuelType: 'Petrol',
      transmission: 'Auto',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3',
      featured: true,
    },
    // Add more cars as needed
  ];

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Used cars for sale nationwide
        </Typography>

        <Grid container spacing={4}>
          {/* Filters Section */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Make</InputLabel>
                  <Select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    label="Make"
                  >
                    <MenuItem value="">All Makes</MenuItem>
                    <MenuItem value="chevrolet">Chevrolet</MenuItem>
                    <MenuItem value="ford">Ford</MenuItem>
                    <MenuItem value="toyota">Toyota</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Model</InputLabel>
                  <Select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    label="Model"
                  >
                    <MenuItem value="">All Models</MenuItem>
                    <MenuItem value="suburban">Suburban</MenuItem>
                    <MenuItem value="tahoe">Tahoe</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />

                <Button variant="contained" color="primary" fullWidth>
                  Search
                </Button>
              </Stack>
            </Paper>

            {/* Additional Filters */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Stack spacing={1}>
                {['Price & Payment', 'Mileage', 'Year', 'Drive train', 'Transmission', 'Exterior color', 'Interior color'].map((filter) => (
                  <Accordion key={filter} elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{filter}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">
                        Filter options for {filter}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Cars Grid */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {cars.map((car) => (
                <Grid item key={car.id} xs={12} sm={6} md={6}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.2s ease-in-out',
                      },
                    }}
                  >
                    {car.featured && (
                      <Chip
                        label="Featured"
                        color="error"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 1,
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.imageUrl}
                      alt={`${car.make} ${car.model}`}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {car.make} {car.model} {car.year}
                      </Typography>
                      <Typography variant="h5" color="error" gutterBottom>
                        ₹{car.price.toLocaleString()}
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <LocalGasStationIcon fontSize="small" />
                            <Typography variant="body2">{car.fuelType}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <SpeedIcon fontSize="small" />
                            <Typography variant="body2">{car.mileage.toLocaleString()} km</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <SettingsIcon fontSize="small" />
                            <Typography variant="body2">{car.transmission}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="error"
                          fullWidth
                          onClick={() => navigate(`/car/${car.id}`)}
                        >
                          View details
                        </Button>
                        <IconButton color="error">
                          <FavoriteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CertifiedPreOwned;
