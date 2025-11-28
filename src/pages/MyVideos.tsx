import React, { useState, useEffect } from 'react';
import { Layout } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { videoAPI, orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Trash2, ExternalLink, TrendingUp, Eye, ThumbsUp } from 'lucide-react';

interface Video {
    _id: string;
    url: string;
    title: string;
    simulatedViews: number;
    simulatedLikes: number;
    simulatedCTR: number;
    proxiesUsed: number;
    createdAt: string;
}

export const MyVideos: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [videosData, ordersData] = await Promise.all([
                videoAPI.getAll(),
                orderAPI.getAll()
            ]);
            setVideos(videosData);
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this video?')) {
            try {
                await videoAPI.delete(id);
                fetchData();
            } catch (error) {
                console.error('Error deleting video:', error);
            }
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white">My Videos</h2>
                        <p className="text-gray-400 mt-1">Track all your simulated video metrics</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-400">Total Videos</div>
                        <div className="text-2xl font-bold text-white">{videos.length}</div>
                    </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-blue-500/10 border-blue-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{orders.length}</div>
                                <div className="text-sm text-gray-400">Active Plans</div>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-purple-500/10 border-purple-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                <Eye size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">
                                    {formatNumber(videos.reduce((sum, v) => sum + (v.simulatedViews || 0), 0))}
                                </div>
                                <div className="text-sm text-gray-400">Total Simulated Views</div>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-green-500/10 border-green-500/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                                <ThumbsUp size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">
                                    {formatNumber(videos.reduce((sum, v) => sum + (v.simulatedLikes || 0), 0))}
                                </div>
                                <div className="text-sm text-gray-400">Total Simulated Likes</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Videos List */}
                <Card>
                    <h3 className="text-xl font-bold text-white mb-6">Video History</h3>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400">Loading...</div>
                    ) : videos.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">No videos yet</div>
                            <p className="text-sm text-gray-500">Go to Dashboard to start simulating views</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {videos.map((video) => (
                                <div key={video._id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="text-white font-medium truncate">{video.title || 'YouTube Video'}</h4>
                                                <a
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                            </div>
                                            <p className="text-sm text-gray-400 truncate mb-3">{video.url}</p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <div className="text-xs text-gray-500">Views</div>
                                                    <div className="text-white font-medium">{formatNumber(video.simulatedViews || 0)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500">Likes</div>
                                                    <div className="text-white font-medium">{formatNumber(video.simulatedLikes || 0)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500">CTR</div>
                                                    <div className="text-white font-medium">{(video.simulatedCTR || 0).toFixed(1)}%</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500">Proxies</div>
                                                    <div className="text-white font-medium">{video.proxiesUsed || 0}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 items-end">
                                            <Badge variant="success">Completed</Badge>
                                            <div className="text-xs text-gray-500">
                                                {new Date(video.createdAt).toLocaleDateString()}
                                            </div>
                                            <button
                                                onClick={() => handleDelete(video._id)}
                                                className="text-red-400 hover:text-red-300 mt-2"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Recent Orders */}
                {orders.length > 0 && (
                    <Card>
                        <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
                        <div className="space-y-3">
                            {orders.slice(0, 5).map((order) => (
                                <div key={order._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                    <div>
                                        <div className="text-white font-medium">{order.planId?.name || 'Plan'}</div>
                                        <div className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-bold">${order.amount}</div>
                                        <Badge variant={order.status === 'COMPLETED' ? 'success' : 'warning'}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </Layout>
    );
};
