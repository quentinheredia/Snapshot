// src/pages/Snapshot.tsx

import React, { useState } from "react";
import SnapshotLive from "../components/SnapshotLive";
import SnapChart from "../components/SnapChart";

const Snapshot: React.FC = () => {
    const [snapshotData, setSnapshotData] = useState<any>(null);

    const handleSnapshotUpdate = (data: any) => {
        setSnapshotData(data);
    };

    return (
        <div>
            <h1>Snapshot Page</h1>
            <SnapshotLive onSnapshotUpdate={handleSnapshotUpdate} />
            {snapshotData && <SnapChart snapshotData={snapshotData} />}
        </div>
    );
};

export default Snapshot;
