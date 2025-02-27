import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { PurchaseRequest, Car } from '../types';

const ManageRequests = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [requests, setRequests] = useState<(PurchaseRequest & { car?: Car })[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadRequests();
  }, [user, navigate]);

  const loadRequests = async () => {
    try {
      const requestsRef = collection(db, 'purchaseRequests');
      const q = query(requestsRef, where('sellerUserId', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      
      const requestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PurchaseRequest[];

      // Fetch car details for each request
      const requestsWithCars = await Promise.all(
        requestsData.map(async (request) => {
          const carDoc = await getDocs(query(collection(db, 'cars'), where('id', '==', request.carId)));
          const car = carDoc.docs[0]?.data() as Car | undefined;
          return { ...request, car };
        })
      );

      setRequests(requestsWithCars);
    } catch (error) {
      console.error('Error loading requests:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load purchase requests',
        severity: 'error'
      });
    }
  };

  const handleStatusUpdate = async (requestId: string, newStatus: PurchaseRequest['status']) => {
    try {
      const requestRef = doc(db, 'purchaseRequests', requestId);
      await updateDoc(requestRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });

      // If approved, update car status
      if (newStatus === 'approved') {
        const request = requests.find(r => r.id === requestId);
        if (request?.car?.id) {
          const carRef = doc(db, 'cars', request.car.id);
          await updateDoc(carRef, {
            status: 'pending',
            updatedAt: new Date().toISOString()
          });
        }
      }

      setSnackbar({
        open: true,
        message: `Request ${newStatus} successfully`,
        severity: 'success'
      });
      loadRequests();
    } catch (error) {
      console.error('Error updating request:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update request status',
        severity: 'error'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Purchase Requests
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Car</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.buyerId}</TableCell>
                <TableCell>{request.car?.make} {request.car?.model}</TableCell>
                <TableCell>{request.message}</TableCell>
                <TableCell>
                  <Chip 
                    label={request.status.toUpperCase()}
                    color={getStatusColor(request.status)}
                  />
                </TableCell>
                <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageRequests;
