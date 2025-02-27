import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface PurchaseRequestFormProps {
  carId: string;
  onSuccess: () => void;
}

const PurchaseRequestForm = ({ carId, onSuccess }: PurchaseRequestFormProps) => {
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/purchase-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId,
          userId: user?.uid,
          message,
          status: 'pending',
        }),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting purchase request:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Request to Purchase
      </Typography>
      <TextField
        label="Your Message"
        multiline
        rows={4}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Request
      </Button>
    </Box>
  );
};

export default PurchaseRequestForm;
