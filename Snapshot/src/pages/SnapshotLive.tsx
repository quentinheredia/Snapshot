import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Option, Typography } from '@mui/joy';
import SnapCell from '../components/SnapCell';

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

const SnapshotLive: React.FC = () => {
  const [method, setMethod] = useState<string>('Hourly');
  const [amount, setAmount] = useState<string>('');
  const [weeklyHours, setWeeklyHours] = useState<string>('');
  const [snapshotData, setSnapshotData] = useState<SnapshotData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMethodChange = (_: any, newValue: string | null) => {
    if (newValue !== null) {
      setMethod(newValue);
      setAmount('');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleWeeklyHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeeklyHours(e.target.value);
  };

  const getPayload = () => {
    const wh = weeklyHours ? Number(weeklyHours) : undefined;
    let payload: any = {};
    const amt = Number(amount);
    switch (method) {
      case 'Hourly':
        payload = { hourly_rate: amt, weekly_hours: wh };
        break;
      case 'Daily': {
        const hours = wh || 37.5;
        const hourly_rate = amt / (hours / 5);
        payload = { hourly_rate, weekly_hours: hours };
        break;
      }
      case 'Weekly':
        payload = { weekly_income: amt, weekly_hours: wh };
        break;
      case 'Monthly':
        payload = { yearly_income: amt * 12, weekly_hours: wh };
        break;
      case 'Yearly':
        payload = { yearly_income: amt, weekly_hours: wh };
        break;
      default:
        break;
    }
    return payload;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = getPayload();
    try {
      const res = await fetch("http://localhost:8000/api/snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setSnapshotData(data);
    } catch (error) {
      console.error("Error fetching snapshot data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to generate time bank details string with threshold for numbers less than 1.
  const generateTimeBankDetails = (hours: number) => {
    const workDays = hours / 8;
    const workWeeks = hours / 40;
    const workMonths = hours / 160;
    const workYears = hours / 2080;

    const details: string[] = [];
    // Only include values if they are at least 1
    if (workDays >= 1) details.push(`${workDays.toFixed(0)} work days`);
    if (workDays >= 1) details.push(`${workDays.toFixed(0)} eight-hour shifts`);
    if (workWeeks >= 1) details.push(`${workWeeks.toFixed(0)} work weeks`);
    if (workMonths >= 1) details.push(`${workMonths.toFixed(0)} work months`);
    if (workYears >= 1) details.push(`${workYears.toFixed(0)} work years`);

    return details.length > 0 ? `That's ${details.join(', ')} of working and putting everything into the purchase.` : '';
  };

   // Provide defaults for projections and timeBank if they aren't returned
   const projections = snapshotData?.projections || {};
   const timeBank = snapshotData?.timeBank || {};

  return (
    <Box sx={{ p: 2 }}>
      <Typography level="h3" textAlign="center" gutterBottom>
        Financial Snapshot Live
      </Typography>
      
      {/* Form Section */}
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
        <FormControl>
          <FormLabel>Input Method</FormLabel>
          <Select name="method" value={method} onChange={handleMethodChange}>
            <Option value="Hourly">Hourly</Option>
            <Option value="Daily">Daily</Option>
            <Option value="Weekly">Weekly</Option>
            <Option value="Monthly">Monthly</Option>
            <Option value="Yearly">Yearly</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>{method === 'Hourly' ? 'Hourly Rate' : 'Amount'}</FormLabel>
          <Input
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder={method === 'Hourly' ? 'e.g. 25' : 'e.g. 60000'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Weekly Hours</FormLabel>
          <Input
            name="weekly_hours"
            value={weeklyHours}
            onChange={handleWeeklyHoursChange}
            placeholder="e.g. 40"
          />
        </FormControl>
        <Button
            sx = {{
                color: 'primary.softActiveColor',
            }}  
            onClick={handleSubmit} variant="plain">
          {loading ? "Updating..." : "Update Snapshot"}
        </Button>
      </Box>

      {/* Display Sections */}
      {snapshotData ? (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography level="h4" textAlign="center">
              Salary Breakdown
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                mt: 2,
              }}
            >
              {Object.entries(snapshotData.breakdown)
                .filter(([_, value]) => value !== 0)
                .map(([key, value], index) => (
                  <SnapCell
                    key={index}
                    title={key}
                    content={`$${value.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Typography level="h4" textAlign="center">
              Projections
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                mt: 2,
              }}
            >
              {Object.entries(snapshotData.projections)
                .filter(([_, value]) => value !== 0)
                .map(([key, value], index) => (
                  <SnapCell
                    key={index}
                    title={key}
                    content={`$${value.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  />
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography level="h4" textAlign="center">
              Time Bank
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                mt: 2,
              }}
            >
              {Object.entries(snapshotData.timeBank)
                .filter(([_, value]) => value !== 0)
                .map(([key, value], index) => {
                  const details = generateTimeBankDetails(value);
                  return (
                    <SnapCell
                      key={index}
                      title={key}
                      content={
                        <>
                          <div>{`Will cost you ${value.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            })} hours of work.`}</div>
                          {details && <div>{details}</div>}
                        </>
                      }
                    />
                  );
                })}
            </Box>
          </Box>
        </>
      ) : (
        <Typography level="body-md" textAlign="center" sx={{ mt: 4 }}>
          {loading ? "Loading..." : "Enter data and click 'Update Snapshot'"}
        </Typography>
      )}
    </Box>
  );
};

export default SnapshotLive;
