import React from 'react';
import { Button, Box, Typography } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';

const Home: React.FC = () => {
  return (
    <div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Typography level="h2" component="h1" gutterBottom>
          SNAPSHOT
        </Typography>
        <Typography level="body-md">
          Your birds-eye view of your financial information.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Typography level="h2" component="h1" gutterBottom>
          Visualize your finances. 
        </Typography>
        <Button component={RouterLink} to="/pages/Snapshot" variant="outlined">
          <Typography level="body-md">
            See how much you actually bring home.
          </Typography>
        </Button>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Typography level="h2" component="h1" gutterBottom>
          Is that new car too expensive? 
        </Typography>
        <Button component={RouterLink} to="/pages/Debt" variant="outlined">
          <Typography level="body-md">
            View how much a loan will actually cost you.
          </Typography>
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Typography level="h2" component="h1" gutterBottom>
          View how taxes grow as you earn.
        </Typography>
        <Button component={RouterLink} to="/pages/Ladder" variant="outlined">
          <Typography level="body-md">
            View our tax chart.
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Home;
