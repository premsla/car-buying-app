import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase/firebaseConfig";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = user !== null;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleCloseUserMenu();
  };

  const pages = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Certified Pre-Owned', path: '/certified-pre-owned' },
    { title: 'Compare Cars', path: '/compare-cars' },
  ];

  const userPages = user ? [
    { title: 'Manage Listings', path: '/manage-listings' },
    ...(user.role === 'admin' ? [{ title: 'Admin', path: '/admin' }] : []),
  ] : [];

  const allPages = [...pages, ...userPages];

  const renderMobileMenu = (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {allPages.map((page) => (
            <ListItem key={page.title} disablePadding>
              <ListItemButton
                component={Link}
                to={page.path}
                onClick={() => setMobileMenuOpen(false)}
                selected={location.pathname === page.path}
                sx={{
                  color: location.pathname === page.path ? 'primary.main' : 'inherit',
                }}
              >
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: '#0A0A0A',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DirectionsCarIcon sx={{ mr: 1, color: 'error.main' }} />
            CarSpace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.path}
                sx={{
                  my: 2,
                  mx: 1,
                  color: 'white',
                  display: 'block',
                  '&:hover': {
                    color: 'error.main'
                  }
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated && (
              <>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ 
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {user?.role === 'admin' ? (
                    <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: 32 }} />
                  )}
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      width: '200px',
                      mt: 1
                    }
                  }}
                >
                  <MenuItem onClick={() => {
                    handleCloseUserMenu();
                    navigate('/profile');
                  }}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>

                  {user?.role === 'admin' && (
                    <MenuItem onClick={() => {
                      handleCloseUserMenu();
                      navigate('/admin');
                    }}>
                      <ListItemIcon>
                        <AdminPanelSettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Admin" />
                    </MenuItem>
                  )}

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </>
            )}
            {!isAuthenticated && (
              <Button
                component={Link}
                to="/login"
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      {renderMobileMenu}
    </AppBar>
  );
};

export default Navbar;
