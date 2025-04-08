// src/types/snapshotTypes.ts

export interface SnapshotData {
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
    retirementTimeline: {
        year: number;
        netWorth: number;
    }[];
}
