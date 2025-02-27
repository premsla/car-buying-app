import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon }) => {
  return (
    <Card 
      sx={{ 
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': { 
          transform: 'translateY(-5px)',
          transition: 'all 0.3s ease',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        {icon}
        <Typography variant="body1" sx={{ mt: 1 }}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
