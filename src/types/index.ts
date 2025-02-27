export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  seats: number;
  description?: string;
  images: string[];
  status: 'available' | 'sold' | 'pending';
  condition: 'new' | 'used';
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseRequest {
  id?: string;
  carId: string;
  buyerId: string;
  sellerUserId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
  message?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
  createdAt?: string;
  lastLogin?: string;
}
