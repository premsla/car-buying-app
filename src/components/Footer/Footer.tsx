import React from 'react';
import { Box, Container, Grid, Typography, Link, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
                Do you have Something to Sell through Us?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#ff0000',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#cc0000',
                  },
                }}
                component={RouterLink}
                to="/contact"
              >
                Sell your car safely
              </Button>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ mb: 1, color: 'white' }}>
                76-1, near Him range Bangalore
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: 'white' }}>
                Karnataka 560025
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: 'white' }}>
                help@carspace.com
              </Typography>
              <Typography variant="body1" sx={{ color: 'white' }}>
                +91 8660765555
              </Typography>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link component={RouterLink} to="/" sx={{ color: 'white' }} underline="hover">
                    About Us
                  </Link>
                  <Link component={RouterLink} to="/listings" sx={{ color: 'white' }} underline="hover">
                    Listings
                  </Link>
                  <Link component={RouterLink} to="/testimonials" sx={{ color: 'white' }} underline="hover">
                    Testimonials
                  </Link>
                  <Link component={RouterLink} to="/faqs" sx={{ color: 'white' }} underline="hover">
                    FAQ's
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Link href="#" sx={{ color: 'white' }}>
                    <Facebook />
                  </Link>
                  <Link href="#" sx={{ color: 'white' }}>
                    <Twitter />
                  </Link>
                  <Link href="#" sx={{ color: 'white' }}>
                    <Instagram />
                  </Link>
                  <Link href="#" sx={{ color: 'white' }}>
                    <YouTube />
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.3)', mt: 4, pt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Link component={RouterLink} to="/terms" sx={{ color: 'white' }} underline="hover">
            Terms & Conditions
          </Link>
          <Link component={RouterLink} to="/privacy" sx={{ color: 'white' }} underline="hover">
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
