import React from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Settings</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Profile Settings</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 32 }}>
                  {user?.firstName?.charAt(0)}
                </Avatar>
                <Button variant="outlined">Change Photo</Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="First Name" defaultValue={user?.firstName} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Last Name" defaultValue={user?.lastName} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" defaultValue={user?.email} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained">Save Changes</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Change Password</Typography>
              <TextField fullWidth label="Current Password" type="password" sx={{ mb: 2 }} />
              <TextField fullWidth label="New Password" type="password" sx={{ mb: 2 }} />
              <TextField fullWidth label="Confirm New Password" type="password" sx={{ mb: 2 }} />
              <Button variant="contained">Update Password</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Notification Settings</Typography>
              <Typography color="text.secondary">Email notifications - Coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
