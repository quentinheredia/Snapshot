import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Slider, Box, Typography } from '@mui/joy';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartData } from 'chart.js';

// Register Chart.js components
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTitle, Tooltip, Legend);

const SalaryGraph: React.FC = () => {
  const [minSalary, setMinSalary] = useState(30000);
  const [maxSalary, setMaxSalary] = useState(100000);
  const [chartData, setChartData] = useState<ChartData<'line', number[], unknown>>({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define chart options with custom grid color.
  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: true,
          color: '#CECECE'  // Change this to your desired color
        }
      },
      y: {
        grid: {
          display: true,
          color: '#CECECE'  // Change this to your desired color
        }
      }
    }
  };

  useEffect(() => {
    const fetchAfterTaxValues = async () => {
      setLoading(true);
      setError(null);

      try {
        // Generate an array of before-tax salary values.
        const salaryStep = (maxSalary - minSalary) / 20;
        const beforeTax: number[] = [];
        for (let s = minSalary; s <= maxSalary; s += salaryStep) {
          beforeTax.push(s);
        }

        // Send the salary data to your FastAPI endpoint.
        const response = await fetch('http://localhost:8000/api/tax', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ salaries: beforeTax, region: 'Ontario' })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tax data');
        }

        const data = await response.json();

        // Update chart data with the before-tax values and returned after-tax values.
        setChartData({
          labels: beforeTax,
          datasets: [
            {
              label: 'Before Tax',
              data: beforeTax,
              borderColor: 'blue',
              fill: false
            },
            {
              label: 'After Tax',
              data: data.afterTax,
              borderColor: 'green',
              fill: false
            }
          ]
        });
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAfterTaxValues();
  }, [minSalary, maxSalary]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography level="h4">Take-home pay comparison (Ontario)</Typography>
      <Box sx={{ my: 2 }}>
        <Typography level="body-md">Select Salary Range</Typography>
        <Typography level="body-md">Minimum Salary: ${minSalary}</Typography>
        <Slider
          min={0}
          max={200000}
          step={1000}
          value={minSalary}
          onChange={(e, val) => setMinSalary(val as number)}
        />
        <Typography level="body-md">Maximum Salary: ${maxSalary}</Typography>
        <Slider
          min={0}
          max={500000}
          step={1000}
          value={maxSalary}
          onChange={(e, val) => setMaxSalary(val as number)}
        />
      </Box>
      {loading ? (
        <Typography level="body-md">Loading...</Typography>
      ) : error ? (
        <Typography level="body-md" color="danger">
          {error}
        </Typography>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </Box>
  );
};

export default SalaryGraph;
