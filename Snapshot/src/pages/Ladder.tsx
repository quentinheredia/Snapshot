import React from 'react';
import { Box, Typography } from '@mui/joy';
import SalaryGraph from '../components/SalaryGraph'; // adjust the path as necessary

const Ladder: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <SalaryGraph />
    </Box>
  );
};

export default Ladder;