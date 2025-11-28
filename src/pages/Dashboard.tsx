import React, { useState, useEffect } from 'react';
import { Layout } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LiveCounter } from '../components/simulation/LiveCounter';
import { GrowthChart } from '../components/simulation/GrowthChart';
import { ProxyTable } from '../components/simulation/ProxyTable';
import { useSimulation } from '../hooks/useSimulation';
import { videoAPI, orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Play, Square, TrendingUp, Eye, ThumbsUp, MousePointerClick, AlertCircle, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { state, startSimulation, stopSimulation } = useSimulation(0);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [hasActivePlan, setHasActivePlan] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        checkActivePlan();
    }, []);

    const checkActivePlan = async () => {
        try {
            const orders = await orderAPI.getAll();
            // Check if user has any VIEWS plan
            const viewsPlan = orders.find((order: any) =>
                order.planId?.type === 'VIEWS' && order.status === 'COMPLETED'
            );
            setHasActivePlan(!!viewsPlan);
        } catch (error) {
            console.error('Error checking plan:', error);
        }
    };

    const handleStartBoost = async () => {
        if (!url) {
            setMessage('Please enter a YouTube URL');
            return;
        }

        if (!hasActivePlan) {
            setMessage('You need to purchase a Views Boost plan first!');
            setTimeout(() => navigate('/plans'), 2000);
            return;
        }

        setLoading(true);
        try {
            // Save video to database
            await videoAPI.create({ url, title: 'YouTube Video' });
            startSimulation();
            setMessage('Boost started! (Simulation only)');
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Failed to start boost');
        } finally {
            setLoading(false);
        }
    };

    // Render admin view
    if (isAdmin) {
        return (
            <Layout>
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
                        <Button onClick={() => navigate('/admin')} variant="outline">
                            Go to Admin Panel
                        </Button>
                    </div>
                    <Card className="p-8 text-center">
                        <p className="text-gray-400 text-lg">
                            Admin users do not have access to Views Boost simulation.
                            <br />
                            <br />
                            Please use the <strong className="text-white">Admin Panel</strong> to manage plans, proxies, and view analytics.
                        </p>
                    </Card>
                </div>
            </Layout>
        );
    }

    // Render user view
    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">YouTube Views Boost</h2>
                        <p className="text-gray-400">Enter your video URL and start the simulation</p>
                    </div>
                </div>

                {/* URL Input & Status */}
                <Card className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Paste YouTube Video Link..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        {!hasActivePlan && (
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-3">
                                <AlertCircle className="text-yellow-400" size={20} />
                                <div className="flex-1">
                                    <p className="text-yellow-400 font-medium">No Active Views Plan</p>
                                    <p className="text-yellow-400/70 text-sm">Purchase a Views Boost plan to start boosting</p>
                                </div>
                                <Button
                                    onClick={() => navigate('/plans')}
                                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500"
                                >
                                    <ShoppingCart size={16} /> Buy Plan
                                </Button>
                            </div>
                        )}

                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.includes('success') || message.includes('started')
                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}>
                                {message}
                            </div>
                        )}

                        <div className="flex gap-4">
                            {!state.isRunning ? (
                                <Button
                                    onClick={handleStartBoost}
                                    className="flex-1 flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    <Play size={20} /> {loading ? 'Starting...' : 'Start Views Boost'}
                                </Button>
                            ) : (
                                <Button
                                    onClick={stopSimulation}
                                    variant="danger"
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Square size={20} /> Stop Boost
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="flex flex-col items-center justify-center py-8">
                        <div className="mb-2 p-3 bg-blue-500/10 rounded-full text-blue-400">
                            <Eye size={24} />
                        </div>
                        <LiveCounter value={state.views} label="Total Views" color="text-blue-400" />
                    </Card>
                    <Card className="flex flex-col items-center justify-center py-8">
                        <div className="mb-2 p-3 bg-red-500/10 rounded-full text-red-400">
                            <ThumbsUp size={24} />
                        </div>
                        <LiveCounter value={state.likes} label="Likes" color="text-red-400" />
                    </Card>
                    <Card className="flex flex-col items-center justify-center py-8">
                        <div className="mb-2 p-3 bg-purple-500/10 rounded-full text-purple-400">
                            <MousePointerClick size={24} />
                        </div>
                        <div className="text-4xl font-bold text-purple-400">{state.ctr}%</div>
                        <span className="text-sm text-gray-400 uppercase tracking-wider mt-1">CTR</span>
                    </Card>
                    <Card className="flex flex-col items-center justify-center py-8">
                        <div className="mb-2 p-3 bg-green-500/10 rounded-full text-green-400">
                            <TrendingUp size={24} />
                        </div>
                        <LiveCounter value={state.proxiesUsed} label="Proxies Active" color="text-green-400" />
                    </Card>
                </div>

                {/* Main Simulation Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <GrowthChart data={state.chartData} />
                    </div>
                    <div className="lg:col-span-1">
                        <ProxyTable />
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm">
                        <strong>⚠️ SIMULATION ONLY:</strong> This is a demonstration platform. No real YouTube views are generated. All metrics are simulated for educational purposes.
                    </p>
                </div>
            </div>
        </Layout>
    );
};
