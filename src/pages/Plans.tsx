import React, { useState, useEffect } from 'react';
import { Layout } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { planAPI, orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Check, Zap, Star } from 'lucide-react';

interface Plan {
    _id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    type: string;
}

export const Plans: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    // Separate VIEWS plans from other service plans
    const viewsPlans = plans.filter(p => p.type === 'VIEWS');
    const servicePlans = plans.filter(p => p.type !== 'VIEWS');

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const data = await planAPI.getAll();
            setPlans(data);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (plan: Plan) => {
        if (!user) {
            setMessage('Please login to purchase');
            return;
        }

        setPurchasing(plan._id);
        try {
            await orderAPI.create({
                planId: plan._id,
                amount: plan.price,
            });
            setMessage(`✅ Successfully purchased ${plan.name}!`);
            setTimeout(() => {
                setMessage('');
                window.location.href = '/dashboard';
            }, 2000);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Purchase failed');
        } finally {
            setPurchasing(null);
        }
    };

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            VIEWS: 'bg-gradient-to-r from-blue-500 to-purple-500',
            SEO: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            THUMBNAIL: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            INFLUENCER: 'bg-green-500/20 text-green-400 border-green-500/30',
            ADS: 'bg-red-500/20 text-red-400 border-red-500/30',
        };
        return colors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Views Boost Plans Section */}
                <div>
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
                            <Zap size={16} /> Most Popular
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-3">YouTube Views Boost Plans</h2>
                        <p className="text-gray-400 text-lg">Choose a package and start boosting your video views</p>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-lg text-center mb-6 ${message.includes('✅')
                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                            }`}>
                            {message}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center text-gray-400">Loading plans...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {viewsPlans.map((plan, idx) => (
                                <Card
                                    key={plan._id}
                                    className={`flex flex-col h-full relative overflow-hidden ${idx === 1 ? 'border-2 border-blue-500 scale-105 shadow-2xl shadow-blue-500/20' : ''
                                        }`}
                                >
                                    {idx === 1 && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                                            <Star size={12} className="inline mr-1" /> POPULAR
                                        </div>
                                    )}

                                    <div className="p-6 flex flex-col h-full">
                                        <div className="text-center mb-6">
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${getTypeColor(plan.type)} text-white`}>
                                                {plan.type}
                                            </div>
                                            <div className="text-5xl font-bold text-white mb-2">${plan.price}</div>
                                            <div className="text-gray-400 text-sm">one-time payment</div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 text-center">{plan.name}</h3>
                                        <p className="text-gray-400 text-sm mb-6 text-center flex-1">{plan.description}</p>

                                        <div className="space-y-3 mb-6">
                                            {plan.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Check size={16} className="text-green-400 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            onClick={() => handlePurchase(plan)}
                                            disabled={purchasing === plan._id}
                                            className={`w-full ${idx === 1 ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500' : ''}`}
                                        >
                                            {purchasing === plan._id ? 'Processing...' : 'Purchase Now'}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Service Plans Section */}
                {servicePlans.length > 0 && (
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Additional Services</h2>
                            <p className="text-gray-400">Legal promotional services to grow your channel</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {servicePlans.map((plan) => (
                                <Card key={plan._id} className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(plan.type)}`}>
                                            {plan.type}
                                        </span>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-white">${plan.price}</div>
                                            <div className="text-xs text-gray-400">one-time</div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-1">{plan.description}</p>

                                    <div className="space-y-2 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                                <Check size={16} className="text-green-400" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={() => handlePurchase(plan)}
                                        disabled={purchasing === plan._id}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        {purchasing === plan._id ? 'Processing...' : 'Purchase Now'}
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                        <strong>⚠️ Important:</strong> View boost plans are for SIMULATION purposes only. We do NOT provide real YouTube views or violate YouTube's Terms of Service. This is purely a demonstration platform.
                    </p>
                </div>
            </div>
        </Layout>
    );
};
