import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { useCars } from '../context/CarContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Admin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const { cars, addCar, updateCar, deleteCar } = useCars();

  const [newCar, setNewCar] = useState({
    name: '',
    model: '',
    price: '',
    status: 'Available',
    type: 'Sedan',
    image: ''
  });

  // Sample users data
  const [requests] = useState([
    {
      id: 1,
      carName: 'BMW 3 Series',
      customerName: 'John Doe',
      date: '2024-02-25',
      status: 'Pending'
    },
    // Add more sample requests
  ]);

  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddCar = () => {
    setSelectedCar(null);
    setOpenDialog(true);
  };

  const handleEditCar = (car: any) => {
    setSelectedCar(car);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCar(null);
  };

  const handleSaveCar = () => {
    if (selectedCar) {
      // Edit existing car
      updateCar(selectedCar);
    } else {
      // Add new car
      addCar(newCar);
      setNewCar({
        name: '',
        model: '',
        price: '',
        status: 'Available',
        type: 'Sedan',
        image: ''
      });
    }
    handleCloseDialog();
  };

  const handleDeleteCar = (id: number) => {
    deleteCar(id);
  };

  const handleTextInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (selectedCar) {
      setSelectedCar({
        ...selectedCar,
        [name]: value
      });
    } else {
      setNewCar({
        ...newCar,
        [name]: value
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (selectedCar) {
      setSelectedCar({
        ...selectedCar,
        [name]: value
      });
    } else {
      setNewCar({
        ...newCar,
        [name]: value
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        if (selectedCar) {
          setSelectedCar({
            ...selectedCar,
            image: imageUrl
          });
        } else {
          setNewCar({
            ...newCar,
            image: imageUrl
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Admin Dashboard
          </Typography>

          {/* Dashboard Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Cars
                    </Typography>
                    <Typography variant="h4">
                      {cars.length}
                    </Typography>
                  </Box>
                  <DirectionsCarIcon sx={{ 
                    fontSize: 40, 
                    color: 'primary.main',
                    opacity: 0.7
                  }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography variant="h4">
                      {users.length}
                    </Typography>
                  </Box>
                  <PeopleIcon sx={{ 
                    fontSize: 40, 
                    color: 'primary.main',
                    opacity: 0.7
                  }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper'
              }}
            >
              <Tab label="Car Management" />
              <Tab label="Purchase Requests" />
            </Tabs>
          </Paper>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddCar}
            >
              Add New Car
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      {car.image ? (
                        <img
                          src={car.image}
                          alt={car.name}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: 'grey.200',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          No Image
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>{car.name}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>${car.price}</TableCell>
                    <TableCell>
                      <Chip
                        label={car.status}
                        color={car.status === 'Available' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{car.type}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditCar(car)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteCar(car.id)} color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Car</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.carName}</TableCell>
                    <TableCell>{request.customerName}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={request.status}
                        color={request.status === 'Pending' ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" color="primary">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Add/Edit Car Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedCar ? 'Edit Car' : 'Add New Car'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2, minWidth: 400 }}>
              {/* Image Preview */}
              {(selectedCar?.image || newCar.image) && (
                <Box sx={{ width: '100%', height: 200, mb: 2 }}>
                  <img
                    src={selectedCar ? selectedCar.image : newCar.image}
                    alt="Car preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
              )}
              
              {/* Image Upload */}
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="car-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="car-image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  startIcon={<AddIcon />}
                >
                  {selectedCar?.image || newCar.image ? 'Change Image' : 'Upload Car Image'}
                </Button>
              </label>
              
              <TextField
                name="name"
                label="Car Name"
                fullWidth
                value={selectedCar ? selectedCar.name : newCar.name}
                onChange={handleTextInputChange}
              />
              <TextField
                name="model"
                label="Model"
                fullWidth
                value={selectedCar ? selectedCar.model : newCar.model}
                onChange={handleTextInputChange}
              />
              <TextField
                name="price"
                label="Price"
                fullWidth
                value={selectedCar ? selectedCar.price : newCar.price}
                onChange={handleTextInputChange}
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={selectedCar ? selectedCar.type : newCar.type}
                  label="Type"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Sedan">Sedan</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="Coupe">Coupe</MenuItem>
                  <MenuItem value="Truck">Truck</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={selectedCar ? selectedCar.status : newCar.status}
                  label="Status"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Reserved">Reserved</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveCar} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default Admin;
