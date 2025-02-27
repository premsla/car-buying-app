import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar,
} from '@mui/material';
import TrustIcon from '@mui/icons-material/VerifiedUser';
import ExcellenceIcon from '@mui/icons-material/Star';
import ClientIcon from '@mui/icons-material/Groups';
import CommitmentIcon from '@mui/icons-material/Handshake';

const About = () => {
  const teamMembers = [
    {
      name: 'Max Mitchell',
      role: 'Chief Executive Officer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Sales Officer',
      image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'David Brown',
      role: 'Head of Customer Experience',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      name: 'Michael Turner',
      role: 'Technical Operations Manager',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const values = [
    {
      title: 'Trust',
      description: 'Trust is the cornerstone of every successful relationship we nurture.',
      icon: <TrustIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Excellence',
      description: 'We set the bar high for ourselves, from the services we offer to how we treat our clients.',
      icon: <ExcellenceIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Client-Centric',
      description: 'Your dreams and needs are at the center of our decisions. We listen, understand, and deliver.',
      icon: <ClientIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Our Commitment',
      description: 'We are dedicated to providing you with the highest level of service in transportation.',
      icon: <CommitmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '500px',
          backgroundImage: 'url(https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 6,
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: 700 }}>
            <Typography 
              variant="h2" 
              color="white" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Our Journey
            </Typography>
            <Typography 
              variant="h5" 
              color="white" 
              sx={{ 
                maxWidth: 600,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                mb: 4
              }}
            >
              Leading the way in automotive excellence with passion, innovation, and dedication to customer satisfaction.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                200+
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Cars in Our Fleet
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                10k+
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Happy Customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                16+
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Years of Excellence
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Our Values Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h5" component="div" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Meet Our Team Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Meet Our Team
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          At CarSpace, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your next estate dreams a reality.
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
