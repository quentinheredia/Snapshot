import React, {useEffect, useState } from 'react';
import { Box, Typography } from '@mui/joy';
import SnapCell from '../components/SnapCell';  // Adjust the path as needed

interface SnapshotData {
    breakdown: {
      Yearly: number;
      Monthly: number;
      BiWeekly: number;
      Weekly: number;
      Daily: number;
      Hourly: number;
    };
    projections: {
      FifteenYears: number;
      TenYears: number;
      FiveYears: number;
    };
    timeBank: {
      Dinner: number;
      MovieNight: number;
      NewHouse: number;
      NewCar: number;
    };
  }


const Snapshot: React.FC = () => {
  // Example data for each grid cell; in a real app this might come from an API.
  
  const [data, setData] = useState<SnapshotData | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/snapshot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        hourly_rate: 24.18, 
       }), // or include other fields if needed
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching snapshot data:", err));
  }, []);
  

  const gridData = [
    { title: 'Data 1', content: 'Chart / Info Placeholder 1' },
    { title: 'Data 2', content: 'Chart / Info Placeholder 2' },
    { title: 'Data 3', content: 'Chart / Info Placeholder 3' },
    { title: 'Data 4', content: 'Chart / Info Placeholder 4' },
    { title: 'Data 5', content: 'Chart / Info Placeholder 5' },
    { title: 'Data 6', content: 'Chart / Info Placeholder 6' },
    { title: 'Data 7', content: 'Chart / Info Placeholder 7' },
    { title: 'Data 8', content: 'Chart / Info Placeholder 8' },
    { title: 'Data 9', content: 'Chart / Info Placeholder 9' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography level="h3" textAlign="center" gutterBottom>
        Financial Snapshot
      </Typography>
      <Box>
        <Typography>
          Salary Breakdown
        </Typography>
        <hr />
      </Box>
      {data ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {Object.entries(data.breakdown).map(([key, value], index) => (
            <SnapCell key={index} title={key} content={`$${value.toFixed(2)}`} />
          ))}
        </Box>
      ) : (
        <Typography level="body-md" textAlign="center">
          Loading...
        </Typography>
      )}

      <Box>
        <Typography>
          Projections 
        </Typography>
        <hr />
      </Box>
      {data ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {Object.entries(data.projections).map(([key, value], index) => (
            <SnapCell key={index} title={key} content={`$${value.toFixed(2)}`} />
          ))}
        </Box>
      ) : (
        <Typography level="body-md" textAlign="center">
          Loading...
        </Typography>
      )}

      <Box>
        <Typography>
          Time Bank 
        </Typography>
        <hr />
      </Box>
      {data ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {Object.entries(data.timeBank).map(([key, value], index) => (
            <SnapCell key={index} title={key} content={`${value.toFixed(2)} hours`} />
          ))}
        </Box>
      ) : (
        <Typography level="body-md" textAlign="center">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Snapshot;
