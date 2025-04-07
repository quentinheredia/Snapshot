import React, { useState, FC } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register necessary components for Chart.js to work properly
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title, Tooltip);

// Define the shape of props accepted by the component
interface RetirementChartProps {
    initialSalary?: {
        hourly?: number;
        monthly?: number;
        yearly?: number;
    };
    initialInvestments?: number;
    initialSavings?: number;
    initialRetirementYear?: number;
    initialRetirementIncomeGoal?: number;
    initialLoans?: number;
}

// Declare the functional component using React.FC for type safety and better IDE support
const RetirementChart: FC<RetirementChartProps> = ({
    initialSalary = { yearly: 80000 },
    initialInvestments = 10000,
    initialSavings = 5000,
    initialRetirementYear = 2055,
    initialRetirementIncomeGoal = 960000,
    initialLoans = 20000,
}) => {
    // React state hooks for managing inputs
    const [salary, setSalary] = useState(initialSalary);
    const [investments, setInvestments] = useState(initialInvestments);
    const [savings, setSavings] = useState(initialSavings);
    const [retirementYear, setRetirementYear] = useState(initialRetirementYear);
    const [retirementIncomeGoal, setRetirementIncomeGoal] = useState(initialRetirementIncomeGoal);
    const [loans, setLoans] = useState(initialLoans);
    const [planType, setPlanType] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');

    // Create an array of years from the current year to the retirement year
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: retirementYear - currentYear + 1 }, (_, i) => currentYear + i);

    // Calculate the total annual salary from hourly/monthly/yearly values
    const annualSalary =
        salary.yearly ??
        (salary.monthly ? salary.monthly * 12 : 0) +
        (salary.hourly ? salary.hourly * 2080 : 0);

    // Define the loan repayment rate and savings rate by plan type
    const loanRepaymentRate = 0.1;
    const savingsRates = {
        conservative: 0.1,
        moderate: 0.2,
        aggressive: 0.3,
    };
    const savingsRate = savingsRates[planType];

    // Compute the projected savings over time based on the user's inputs
    const projectedSavings: number[] = [];
    let total = savings + investments;
    const netAnnualIncome = annualSalary - (loans * loanRepaymentRate);

    // Loop through each year and accumulate savings
    years.forEach(() => {
        total += netAnnualIncome * savingsRate;
        projectedSavings.push(Math.round(total));
    });

    // Create a constant line for the retirement income goal for visual comparison
    const targetLine = Array(years.length).fill(retirementIncomeGoal);

    // Define the data structure for the Line chart
    const data = {
        labels: years,
        datasets: [
            {
                label: 'Projected Savings',
                data: projectedSavings,
                fill: false,
                borderColor: '#4CAF50',
                tension: 0.1,
            },
            {
                label: 'Retirement Goal',
                data: targetLine,
                borderDash: [5, 5],
                borderColor: '#FF5722',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    // Chart configuration including title and tooltip formatting
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Retirement Savings Projection',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `$${context.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
        },
    };

    // Render UI with plan selection and chart visualization
    return (
        <div className="p-4">
            {/* Plan type and retirement year inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label>Plan Type:</label>
                    <select
                        value={planType}
                        onChange={(e) => setPlanType(e.target.value as any)}
                        className="w-full border rounded p-2"
                    >
                        <option value="conservative">Conservative</option>
                        <option value="moderate">Moderate</option>
                        <option value="aggressive">Aggressive</option>
                    </select>
                </div>
                <div>
                    <label>Target Retirement Year:</label>
                    <input
                        type="number"
                        value={retirementYear}
                        onChange={(e) => setRetirementYear(parseInt(e.target.value))}
                        className="w-full border rounded p-2"
                    />
                </div>
            </div>

            {/* Salary Slider */}
            <div className="mb-4">
                <label>Yearly Salary: ${annualSalary.toLocaleString()}</label>
                <input
                    type="range"
                    min={10000}  // Set the minimum salary value
                    max={400000} // Set the maximum salary value
                    step={2000}  // The step size
                    value={salary.yearly || 80000}
                    onChange={(e) => setSalary({ yearly: parseInt(e.target.value) })}
                    className="w-full"
                />
            </div>

            {/* Render the Line chart */}
            <Line data={data} options={options as any} />
        </div>
    );
};

// Export the component for reuse
export default RetirementChart;
