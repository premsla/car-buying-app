import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Car {
  id: number;
  name: string;
  model: string;
  price: string;
  status: string;
  type: string;
  image: string;
}

interface CarContextType {
  cars: Car[];
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (car: Car) => void;
  deleteCar: (id: number) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

// Get cars from localStorage
const getStoredCars = (): Car[] => {
  const storedCars = localStorage.getItem('cars');
  return storedCars ? JSON.parse(storedCars) : [
    {
      id: 1,
      name: 'BMW 3 Series',
      model: '2023',
      price: '45000',
      status: 'Available',
      type: 'Sedan',
      image: ''
    }
  ];
};

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(getStoredCars());

  // Save cars to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar: Omit<Car, 'id'>) => {
    setCars(prevCars => {
      const maxId = Math.max(...prevCars.map(car => car.id), 0);
      return [...prevCars, { ...newCar, id: maxId + 1 }];
    });
  };

  const updateCar = (updatedCar: Car) => {
    setCars(prevCars =>
      prevCars.map(car => (car.id === updatedCar.id ? updatedCar : car))
    );
  };

  const deleteCar = (id: number) => {
    setCars(prevCars => prevCars.filter(car => car.id !== id));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};
