// src/components/SnapChart.tsx

import React, { useState } from "react";
import Chart from "./Chart";
import { SnapshotData } from "../Types/types";

interface SnapChartProps {
    snapshotData: SnapshotData;
}

const SnapChart: React.FC<SnapChartProps> = ({ snapshotData }) => {
    const [salary, setSalary] = useState({ yearly: 80000 });

    return (
        <div>
            <Chart data={snapshotData} salary={salary} setSalary={setSalary} />
        </div>
    );
};

export default SnapChart;
