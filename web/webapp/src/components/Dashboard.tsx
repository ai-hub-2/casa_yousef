import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Container,

  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  People as PeopleIcon,
  Storage as StorageIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { TableData, DatabaseTable } from '../types';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [availableTables] = useState<DatabaseTable[]>([
    { name: 'patients', columns: ['id', 'name', 'age', 'gender', 'phone', 'email', 'address', 'created_date'] },
    { name: 'admin', columns: ['id', 'username', 'role', 'created_date'] },
    { name: 'lab_results', columns: ['id', 'patient_id', 'test_type', 'result', 'date_performed'] },
    { name: 'appointments', columns: ['id', 'patient_id', 'appointment_date', 'status', 'notes'] },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePatientRecords = () => {
    navigate('/patients');
  };

  const generateSampleData = (tableName: string): TableData[] => {
    switch (tableName) {
      case 'patients':
        return [
          { id: 1, name: 'John Doe', age: 45, gender: 'Male', phone: '555-0101', email: 'john.doe@email.com', address: '123 Main St', created_date: '2024-01-15' },
          { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', phone: '555-0102', email: 'jane.smith@email.com', address: '456 Oak Ave', created_date: '2024-01-16' },
          { id: 3, name: 'Bob Johnson', age: 67, gender: 'Male', phone: '555-0103', email: 'bob.johnson@email.com', address: '789 Pine Rd', created_date: '2024-01-17' },
          { id: 4, name: 'Alice Brown', age: 29, gender: 'Female', phone: '555-0104', email: 'alice.brown@email.com', address: '321 Elm St', created_date: '2024-01-18' },
        ];
      case 'admin':
        return [
          { id: 1, username: 'admin', role: 'administrator', created_date: '2024-01-01' },
          { id: 2, username: 'lab_tech', role: 'technician', created_date: '2024-01-02' },
        ];
      case 'lab_results':
        return [
          { id: 1, patient_id: 1, test_type: 'Blood Test', result: 'Normal', date_performed: '2024-01-20' },
          { id: 2, patient_id: 2, test_type: 'Urine Test', result: 'Abnormal', date_performed: '2024-01-21' },
          { id: 3, patient_id: 3, test_type: 'X-Ray', result: 'Clear', date_performed: '2024-01-22' },
        ];
      case 'appointments':
        return [
          { id: 1, patient_id: 1, appointment_date: '2024-02-01', status: 'Scheduled', notes: 'Regular checkup' },
          { id: 2, patient_id: 2, appointment_date: '2024-02-02', status: 'Completed', notes: 'Follow-up test results' },
          { id: 3, patient_id: 4, appointment_date: '2024-02-03', status: 'Cancelled', notes: 'Patient rescheduled' },
        ];
      default:
        return [];
    }
  };

  const loadTableData = async () => {
    if (!selectedTable) {
      setError('Please select a table first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = generateSampleData(selectedTable);
      setTableData(data);
    } catch (err) {
      setError('Failed to load table data');
    } finally {
      setLoading(false);
    }
  };

  const generateColumns = (): GridColDef[] => {
    if (tableData.length === 0) return [];
    
    const firstRow = tableData[0];
    return Object.keys(firstRow).map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
      flex: 1,
      minWidth: 100,
    }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StorageIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sky CASA - Medical Laboratory System
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user?.username}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleLogout}
            title="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Database Management
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Select a table from the dropdown below to view and manage data records.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="table-select-label">Select Table</InputLabel>
                    <Select
                      labelId="table-select-label"
                      id="table-select"
                      value={selectedTable}
                      label="Select Table"
                      onChange={(e) => setSelectedTable(e.target.value)}
                    >
                      {availableTables.map((table) => (
                        <MenuItem key={table.name} value={table.name}>
                          {table.name.charAt(0).toUpperCase() + table.name.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    onClick={loadTableData}
                    disabled={loading || !selectedTable}
                    startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                  >
                    {loading ? 'Loading...' : 'Load All Data'}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handlePatientRecords}
                    startIcon={<PeopleIcon />}
                  >
                    Patient Records
                  </Button>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {tableData.length > 0 && (
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={tableData}
                      columns={generateColumns()}
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
                )}

                {selectedTable && tableData.length === 0 && !loading && !error && (
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 4 }}>
                    No data loaded. Click "Load All Data" to view records from the selected table.
                  </Typography>
                )}
              </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;