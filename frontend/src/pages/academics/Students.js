import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Sample data
  const students = [
    { id: 1, name: 'Ahmed Khan', studentId: 'STU-001', class: 'Class 5-A', rollNo: '01', status: 'active', phone: '+92 300 1234567' },
    { id: 2, name: 'Fatima Ali', studentId: 'STU-002', class: 'Class 5-A', rollNo: '02', status: 'active', phone: '+92 300 2345678' },
    { id: 3, name: 'Muhammad Imran', studentId: 'STU-003', class: 'Class 6-B', rollNo: '05', status: 'active', phone: '+92 300 3456789' },
    { id: 4, name: 'Aisha Rahman', studentId: 'STU-004', class: 'Class 6-B', rollNo: '08', status: 'active', phone: '+92 300 4567890' },
    { id: 5, name: 'Omar Farooq', studentId: 'STU-005', class: 'Class 7-A', rollNo: '12', status: 'inactive', phone: '+92 300 5678901' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Students
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Student
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search students by name, ID, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell>Student ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {student.name.charAt(0)}
                      </Avatar>
                      {student.name}
                    </Box>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.status}
                      color={getStatusColor(student.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleMenuOpen}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <ViewIcon sx={{ mr: 1 }} /> View
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <EditIcon sx={{ mr: 1 }} /> Edit
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                        <DeleteIcon sx={{ mr: 1 }} /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Students;
