import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import { Car } from '../../types';

interface CarCardProps {
  car: Car;
  onLearnMore: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onLearnMore }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      borderRadius: 2
    }}>
      <Box sx={{ 
        position: 'absolute', 
        top: 12, 
        left: 12, 
        bgcolor: 'error.main',
        color: 'white',
        px: 1,
        py: 0.5,
        borderRadius: 0.5,
        fontSize: '0.75rem',
        fontWeight: 500
      }}>
        Featured
      </Box>
      <CardMedia
        component="img"
        height="180"
        image={car.images?.[0] || '/placeholder-car.jpg'}
        alt={`${car.make} ${car.model}`}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 2 }}>
        <Typography variant="caption" color="error" sx={{ fontWeight: 500 }}>
          {car.make} {car.model}
        </Typography>
        <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
          {car.make} {car.model} {car.year}
        </Typography>
        <Typography variant="h6" color="error" sx={{ fontWeight: 600, mb: 2 }}>
          ${car.price?.toLocaleString()}
        </Typography>
        
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DirectionsCarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {car.fuelType}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SpeedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {car.mileage}km
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SettingsIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Transmission
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Button
            variant="text"
            sx={{ 
              color: 'text.primary',
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'transparent', color: 'error.main' }
            }}
            onClick={onLearnMore}
          >
            View details →
          </Button>
          <Button
            sx={{
              minWidth: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid',
              borderColor: 'divider',
              p: 0
            }}
          >
            <DirectionsCarIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarCard;
