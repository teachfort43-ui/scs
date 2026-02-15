import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        p: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'white',
        }}
      >
        <SchoolIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            SchoolPro
          </Typography>
          <Typography variant="caption">
            Professional School Management
          </Typography>
        </Box>
      </Box>
      
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
