import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
  Container,

  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../types';

const PatientManagement: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<Partial<Patient>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sample patient data
  useEffect(() => {
    const samplePatients: Patient[] = [
      {
        id: 1,
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        phone: '555-0101',
        email: 'john.doe@email.com',
        address: '123 Main St, City, State 12345',
        created_date: '2024-01-15',
        updated_date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 32,
        gender: 'Female',
        phone: '555-0102',
        email: 'jane.smith@email.com',
        address: '456 Oak Ave, City, State 12345',
        created_date: '2024-01-16',
        updated_date: '2024-01-16'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        age: 67,
        gender: 'Male',
        phone: '555-0103',
        email: 'bob.johnson@email.com',
        address: '789 Pine Rd, City, State 12345',
        created_date: '2024-01-17',
        updated_date: '2024-01-17'
      },
      {
        id: 4,
        name: 'Alice Brown',
        age: 29,
        gender: 'Female',
        phone: '555-0104',
        email: 'alice.brown@email.com',
        address: '321 Elm St, City, State 12345',
        created_date: '2024-01-18',
        updated_date: '2024-01-18'
      },
      {
        id: 5,
        name: 'Charlie Wilson',
        age: 55,
        gender: 'Male',
        phone: '555-0105',
        email: 'charlie.wilson@email.com',
        address: '654 Maple Dr, City, State 12345',
        created_date: '2024-01-19',
        updated_date: '2024-01-19'
      }
    ];
    setPatients(samplePatients);
  }, []);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setFormData({});
    setOpenDialog(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData(patient);
    setOpenDialog(true);
  };

  const handleDeletePatient = (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
      setSuccess('Patient deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSavePatient = () => {
    setError('');
    
    // Validation
    if (!formData.name || !formData.age || !formData.gender) {
      setError('Please fill in all required fields (Name, Age, Gender)');
      return;
    }

    if (editingPatient) {
      // Update existing patient
      const updatedPatients = patients.map(p => 
        p.id === editingPatient.id 
          ? { ...formData, id: editingPatient.id, updated_date: new Date().toISOString().split('T')[0] } as Patient
          : p
      );
      setPatients(updatedPatients);
      setSuccess('Patient updated successfully');
    } else {
      // Add new patient
      const newPatient: Patient = {
        ...formData,
        id: Math.max(...patients.map(p => p.id)) + 1,
        created_date: new Date().toISOString().split('T')[0],
        updated_date: new Date().toISOString().split('T')[0]
      } as Patient;
      setPatients([...patients, newPatient]);
      setSuccess('Patient added successfully');
    }

    setOpenDialog(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
    setEditingPatient(null);
    setError('');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'created_date', headerName: 'Created', width: 110 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditPatient(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeletePatient(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <PeopleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5">
                    Patient Records
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddPatient}
                  >
                    Add New Patient
                  </Button>
                </Box>

                <Box sx={{ height: 600, width: '100%' }}>
                  <DataGrid
                    rows={patients}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableRowSelectionOnClick
                    sx={{ border: 1, borderColor: 'divider' }}
                  />
                </Box>
              </CardContent>
        </Card>
      </Container>

      {/* Add/Edit Patient Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPatient ? 'Edit Patient' : 'Add New Patient'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                required
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                required
                fullWidth
                label="Age"
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender || ''}
                  label="Gender"
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Box>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePatient} variant="contained">
            {editingPatient ? 'Update' : 'Add'} Patient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientManagement;