import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const LandingPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', my: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Garden Coach
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your personal guide to a beautiful garden
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
          Get Started
        </Button>
      </Box>
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Expert Tips
            </Typography>
            <Typography>
              Learn from the best with our expert gardening tips and tricks.
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Plant Care
            </Typography>
            <Typography>
              Discover how to care for your plants and keep them healthy.
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Garden Design
            </Typography>
            <Typography>
              Get inspired with our garden design ideas and plans.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;