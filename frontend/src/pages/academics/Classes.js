import React from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, InputAdornment } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

const Classes = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Classes</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Add Class</Button>
      </Box>
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField fullWidth placeholder="Search classes..." InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
        </Box>
      </Card>
      <Card><CardContent><Typography color="text.secondary">Classes list will be displayed here</Typography></CardContent></Card>
    </Box>
  );
};

export default Classes;
