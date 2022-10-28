import React from 'react';
import { Grid, Paper, Box } from '@mui/material';
export const Todo = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box>To Do</Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
