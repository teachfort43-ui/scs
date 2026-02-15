import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as AttendanceIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar
          sx={{
            bgcolor: `${color}15`,
            color: color,
            width: 56,
            height: 56,
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { title: 'Total Students', value: '1,234', icon: <PeopleIcon fontSize="large" />, color: '#1976d2', subtitle: 'Active students' },
    { title: 'Teachers', value: '85', icon: <SchoolIcon fontSize="large" />, color: '#2e7d32', subtitle: 'Qualified staff' },
    { title: 'Classes', value: '24', icon: <ClassIcon fontSize="large" />, color: '#ed6c02', subtitle: 'Active classes' },
    { title: 'Fee Collection', value: '85%', icon: <PaymentIcon fontSize="large" />, color: '#9c27b0', subtitle: 'This month' },
  ];

  const recentActivities = [
    { id: 1, action: 'New student admitted', class: 'Class 5-A', time: '2 hours ago' },
    { id: 2, action: 'Attendance marked', class: 'Class 10-B', time: '4 hours ago' },
    { id: 3, action: 'Grades uploaded', class: 'Class 8-A', time: '5 hours ago' },
    { id: 4, action: 'Fee payment received', class: 'Class 3-B', time: '1 day ago' },
    { id: 5, action: 'New teacher added', class: 'Mathematics', time: '2 days ago' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening at your school today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activities
              </Typography>
              <Box sx={{ mt: 2 }}>
                {recentActivities.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40 }}>
                        <TrendingUpIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {activity.action}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.class}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Today's Attendance
              </Typography>
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h3" fontWeight="bold" color="success.main">
                  94%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1,160 of 1,234 students present
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    1,160
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Present
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold" color="error.main">
                    52
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Absent
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold" color="warning.main">
                    22
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Late
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Upcoming Events
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="500">
                    Mid-term Examinations
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Starting from Monday
                  </Typography>
                </Box>
                <Box sx={{ mb: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="500">
                    Parent-Teacher Meeting
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Next Saturday
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="500">
                    Annual Sports Day
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Next Month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
