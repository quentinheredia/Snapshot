// src/components/SnapshotLive.tsx

import React, { useState } from "react";
import { SnapshotData } from "../Types/types";

interface SnapshotLiveProps {
    onSnapshotUpdate: (data: SnapshotData) => void;
}

const SnapshotLive: React.FC<SnapshotLiveProps> = ({ onSnapshotUpdate }) => {
    const [method, setMethod] = useState("Yearly");
    const [amount, setAmount] = useState(80000);
    const [weeklyHours, setWeeklyHours] = useState(40);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                yearly_income: amount,
                weekly_hours: weeklyHours,
            };

            const response = await fetch("/api/snapshot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data: SnapshotData = await response.json();
            onSnapshotUpdate(data);
        } catch (error) {
            console.error("Failed to fetch snapshot data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Snapshot Input</h2>

            <label className="block mb-2">
                Salary Method:
                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="block w-full mt-1"
                >
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Hourly">Hourly</option>
                </select>
            </label>

            <label className="block mb-2">
                Salary Amount:
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="block w-full mt-1"
                />
            </label>

            <label className="block mb-4">
                Weekly Hours:
                <input
                    type="number"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="block w-full mt-1"
                />
            </label>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
                {loading ? "Updating..." : "Update Snapshot"}
            </button>
        </div>
    );
};

export default SnapshotLive;
