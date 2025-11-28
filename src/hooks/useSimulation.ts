import { useState, useEffect, useRef } from 'react';

export interface SimulationState {
    views: number;
    likes: number;
    ctr: number;
    proxiesUsed: number;
    isRunning: boolean;
    chartData: { time: string; views: number }[];
}

export const useSimulation = (initialViews = 0) => {
    const [state, setState] = useState<SimulationState>({
        views: initialViews,
        likes: Math.floor(initialViews * 0.05),
        ctr: 4.5,
        proxiesUsed: 0,
        isRunning: false,
        chartData: [],
    });

    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startSimulation = () => {
        if (state.isRunning) return;
        setState(prev => ({ ...prev, isRunning: true }));

        intervalRef.current = setInterval(() => {
            setState(prev => {
                const newViews = prev.views + Math.floor(Math.random() * 15) + 5;
                const newLikes = prev.likes + (Math.random() > 0.7 ? 1 : 0);
                const newProxies = prev.proxiesUsed + (Math.random() > 0.5 ? 1 : 0);
                const newCtr = Math.min(15, Math.max(2, prev.ctr + (Math.random() - 0.5) * 0.1));

                const newChartData = [
                    ...prev.chartData,
                    { time: new Date().toLocaleTimeString(), views: newViews }
                ].slice(-20); // Keep last 20 points

                return {
                    ...prev,
                    views: newViews,
                    likes: newLikes,
                    proxiesUsed: newProxies,
                    ctr: parseFloat(newCtr.toFixed(1)),
                    chartData: newChartData,
                };
            });
        }, 1000);
    };

    const stopSimulation = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setState(prev => ({ ...prev, isRunning: false }));
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return { state, startSimulation, stopSimulation };
};
