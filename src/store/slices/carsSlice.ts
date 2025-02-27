import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  imageUrl: string;
  status: 'available' | 'pending' | 'sold';
  condition: 'New' | 'Used';
  fuelType: string;
  mileage: string;
  transmission: string;
  engineSize: string;
  color: string;
  seats: number;
  doors: number;
  features: string[];
  vin: string;
  stockNumber: string;
  cityMpg: number;
  highwayMpg: number;
  driveType: string;
}

interface CarsState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: [],
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCars, setLoading, setError } = carsSlice.actions;
export default carsSlice.reducer;
