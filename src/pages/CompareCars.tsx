import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  engine: string;
  power: string;
  features: string[];
}

const CompareCars = () => {
  const [car1, setCar1] = useState<string>('');
  const [car2, setCar2] = useState<string>('');

  // This would typically come from your Firebase database
  const availableCars: Car[] = [
    {
      id: '1',
      make: 'Mercedes',
      model: 'C Class',
      year: 2023,
      price: 659999,
      mileage: '28,000',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engine: '2.0L',
      power: '201 hp',
      features: ['Sunroof', 'Navigation', 'Leather Seats'],
    },
    // Add more cars
  ];

  const getCarById = (id: string) => availableCars.find(car => car.id === id);

  const selectedCar1 = car1 ? getCarById(car1) : null;
  const selectedCar2 = car2 ? getCarById(car2) : null;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Compare Cars
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Select two cars to compare their features and specifications
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select First Car</InputLabel>
            <Select
              value={car1}
              label="Select First Car"
              onChange={(e) => setCar1(e.target.value)}
            >
              {availableCars.map((car) => (
                <MenuItem key={car.id} value={car.id}>
                  {car.make} {car.model} ({car.year})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Second Car</InputLabel>
            <Select
              value={car2}
              label="Select Second Car"
              onChange={(e) => setCar2(e.target.value)}
            >
              {availableCars.map((car) => (
                <MenuItem key={car.id} value={car.id}>
                  {car.make} {car.model} ({car.year})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selectedCar1 && selectedCar2 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Specification</TableCell>
                <TableCell>{selectedCar1.make} {selectedCar1.model}</TableCell>
                <TableCell>{selectedCar2.make} {selectedCar2.model}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>{selectedCar1.year}</TableCell>
                <TableCell>{selectedCar2.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>₹{selectedCar1.price.toLocaleString()}</TableCell>
                <TableCell>₹{selectedCar2.price.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mileage</TableCell>
                <TableCell>{selectedCar1.mileage}</TableCell>
                <TableCell>{selectedCar2.mileage}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fuel Type</TableCell>
                <TableCell>{selectedCar1.fuelType}</TableCell>
                <TableCell>{selectedCar2.fuelType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Transmission</TableCell>
                <TableCell>{selectedCar1.transmission}</TableCell>
                <TableCell>{selectedCar2.transmission}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Engine</TableCell>
                <TableCell>{selectedCar1.engine}</TableCell>
                <TableCell>{selectedCar2.engine}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Power</TableCell>
                <TableCell>{selectedCar1.power}</TableCell>
                <TableCell>{selectedCar2.power}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Features</TableCell>
                <TableCell>{selectedCar1.features.join(', ')}</TableCell>
                <TableCell>{selectedCar2.features.join(', ')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CompareCars;
