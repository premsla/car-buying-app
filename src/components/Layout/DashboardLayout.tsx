import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpIcon from '@mui/icons-material/Help';
import ArticleIcon from '@mui/icons-material/Article';
import CompareIcon from '@mui/icons-material/Compare';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon color="success" />, path: '/dashboard' },
  { text: 'Users', icon: <PersonIcon color="success" />, path: '/users' },
  { text: 'Managers', icon: <SupervisorAccountIcon color="success" />, path: '/managers' },
  { text: 'Documents', icon: <DescriptionIcon color="success" />, path: '/documents' },
  { text: 'Property', icon: <HomeIcon color="success" />, path: '/property' },
  { text: 'Bookings', icon: <ListAltIcon color="success" />, path: '/bookings' },
  { text: 'FAQs', icon: <HelpIcon color="success" />, path: '/faqs' },
  { text: 'Blogs', icon: <ArticleIcon color="success" />, path: '/blogs' },
  { text: 'Compare', icon: <CompareIcon color="success" />, path: '/compare' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', bgcolor: '#f5f5f5' }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 240,
          flexShrink: 0,
          borderRadius: 0,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'success.light',
                    '&:hover': {
                      bgcolor: 'success.light',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'success.lighter',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      color: location.pathname === item.path ? 'success.main' : 'text.primary'
                    } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <ListItemButton
              onClick={() => navigate('/logout')}
              sx={{
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'error.lighter',
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#f5f5f5',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
