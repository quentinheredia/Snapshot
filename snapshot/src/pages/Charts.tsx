import React from 'react';
import RetirementChart from '../components/Chart'; 

const Charts: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">CHARTS</h1>
            <RetirementChart />
        </div>
    );
};

export default Charts;
