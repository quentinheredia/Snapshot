// src/components/Chart.tsx

import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { SnapshotData } from "../Types/types";

interface ChartProps {
    data: SnapshotData;
    salary: { yearly: number };
    setSalary: (value: { yearly: number }) => void;
}

const Chart: React.FC<ChartProps> = ({ data, salary, setSalary }) => {
    const { retirementTimeline } = data;

    return (
        <div className="mt-6">
            {/* Salary Slider */}
            <div className="mb-4">
                <label className="block font-medium mb-1">
                    Yearly Salary: ${salary.yearly.toLocaleString()}
                </label>
                <input
                    type="range"
                    min={10000} // Set the minimum salary value
                    max={400000} // Set the maximum salary value
                    step={2000} // The step size
                    value={salary.yearly || 80000}
                    onChange={(e) =>
                        setSalary({ yearly: parseInt(e.target.value, 10) })
                    }
                    className="w-full"
                />
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={retirementTimeline} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Line type="monotone" dataKey="netWorth" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
