import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Announcements = () => (
  <Box>
    <Typography variant="h4" fontWeight="bold" gutterBottom>Announcements</Typography>
    <Card><CardContent><Typography color="text.secondary">Announcements - Coming soon</Typography></CardContent></Card>
  </Box>
);

export default Announcements;
