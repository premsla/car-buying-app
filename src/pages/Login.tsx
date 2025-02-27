import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { setUser } from '../store/slices/authSlice';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  styled,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
}));

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  marginRight: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    margin: 'auto',
  },
  borderRadius: theme.spacing(1),
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#E31837',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E31837',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#E31837',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#E31837',
  color: 'white',
  padding: theme.spacing(1.5),
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#C41230',
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#757575',
  padding: theme.spacing(1.5),
  border: '1px solid #ddd',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#bbb',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(2),
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [adminRole, setAdminRole] = useState<string>('');

  useEffect(() => {
    // Fetch or determine roles after login
    const roles = { user: 'User', admin: 'Admin' }; // Example roles
    setUserRole(roles.user);
    setAdminRole(roles.admin);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Register with:', formData);
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email || '',
          name: user.displayName || 'User',
          role: 'user',
          createdAt: new Date().toISOString(),
        });
      }

      const userData = userDoc.exists() ? userDoc.data() : {
        email: user.email || '',
        name: user.displayName || 'User',
        role: 'user',
      };

      dispatch(setUser({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: userData.role || 'user',
      }));

      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm elevation={3}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Welcome to Carspace
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue
          </Typography>
        </Box>

        <StyledTextField
          fullWidth
          label="Enter your Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          fullWidth
          label="Enter your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlineIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          fullWidth
          label="Enter your Mobile Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <StyledButton
          fullWidth
          variant="contained"
          size="large"
          onClick={handleRegister}
          sx={{ mb: 2 }}
        >
          Register
        </StyledButton>

        <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
          <Divider sx={{ flex: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
            OR
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        <GoogleButton
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </GoogleButton>

        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 3 }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Typography>

        <div>
          <p>User Role: {userRole}</p>
          <p>Admin Role: {adminRole}</p>
        </div>
      </LoginForm>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </LoginContainer>
  );
};

export default Login;
