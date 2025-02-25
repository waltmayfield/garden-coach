"use client"
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { useRouter } from 'next/navigation';

import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
const amplifyClient = generateClient<Schema>();

const LandingPage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', my: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Garden Coach
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your personal guide to a beautiful garden
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
          onClick={async () => {
            const {data: newGarden} = await amplifyClient.models.Garden.create({});
            router.push(`/garden/${newGarden!.id}`);
          }}
        >
          Get Started
        </Button>
        <Button variant="outlined" color="secondary" size="large" sx={{ mt: 2, ml: 2 }} href="/listGardens">
          Browse Gardens
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