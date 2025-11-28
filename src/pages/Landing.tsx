import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Play, Shield, Zap, BarChart, CheckCircle, Star, HelpCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Landing: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative z-50">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    YT Simulator
                </div>
                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <span className="text-gray-300 hidden md:inline">Welcome, {user.name}</span>
                            <Link to={user.role === 'ADMIN' ? "/admin" : "/dashboard"}>
                                <Button variant="outline" className="px-4 py-2">Dashboard</Button>
                            </Link>
                            <Button onClick={handleLogout} variant="danger" className="px-4 py-2">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2">Login</Link>
                            <Link to="/register">
                                <Button variant="outline" className="px-4 py-2">Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Experience the <span className="text-blue-500">Growth</span> <br />
                    Simulation Engine
                </h1>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    A powerful, safe, and visual-only simulation tool for YouTube creators.
                    Watch metrics climb in real-time with our advanced proxy visualization engine.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={user ? (user.role === 'ADMIN' ? "/admin" : "/dashboard") : "/login"}>
                        <Button className="text-lg px-8 py-4 flex items-center gap-2">
                            <Play size={24} /> Start Simulation
                        </Button>
                    </Link>
                    <Button variant="outline" className="text-lg px-8 py-4">
                        View Demo
                    </Button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                    <div className="glass-panel p-8 rounded-2xl text-left border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Instant Simulation</h3>
                        <p className="text-gray-400">Real-time counter updates with realistic growth curves and variability.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl text-left border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 text-purple-400">
                            <BarChart size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Visual Analytics</h3>
                        <p className="text-gray-400">Beautiful charts and progress bars that visualize the simulated engagement.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl text-left border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 text-green-400">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">100% Safe</h3>
                        <p className="text-gray-400">Purely visual simulation. No actual YouTube API interaction or TOS violations.</p>
                    </div>
                </div>
            </main>

            {/* How It Works Section */}
            <section className="py-24 bg-slate-900/50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Start your simulation journey in three simple steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 -translate-y-1/2 z-0" />

                        {[
                            { step: "01", title: "Create Account", desc: "Sign up for a free account to access the dashboard." },
                            { step: "02", title: "Choose Plan", desc: "Select a simulation plan that fits your needs." },
                            { step: "03", title: "Watch Growth", desc: "See your metrics climb in real-time simulation." }
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 bg-slate-900 p-6 rounded-xl border border-white/10 text-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/30">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Choose the perfect plan for your simulation needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Starter", price: "$9", features: ["1,000 Simulated Views", "Basic Speed", "24/7 Support"] },
                            { name: "Pro", price: "$29", features: ["10,000 Simulated Views", "2x Speed Multiplier", "Priority Support", "Analytics Dashboard"], popular: true },
                            { name: "Enterprise", price: "$99", features: ["100,000 Simulated Views", "5x Speed Multiplier", "Dedicated Manager", "Custom Scenarios"] }
                        ].map((plan, idx) => (
                            <div key={idx} className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'} backdrop-blur-sm flex flex-col`}>
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle size={18} className="text-green-400" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/register">
                                    <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-500' : 'bg-white/10 hover:bg-white/20'}`}>
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">What Users Say</h2>
                        <p className="text-gray-400">Join thousands of happy simulators.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Alex Creator", role: "YouTuber", text: "The visualization is incredibly satisfying. It helps me visualize my goals!" },
                            { name: "Sarah Stream", role: "Streamer", text: "I use this to test different growth scenarios. The interface is beautiful." },
                            { name: "Mike Tech", role: "Reviewer", text: "Best simulation tool I've found. The real-time updates are silky smooth." }
                        ].map((review, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-300 mb-6">"{review.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                                    <div>
                                        <div className="font-bold">{review.name}</div>
                                        <div className="text-xs text-gray-400">{review.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Is this real YouTube traffic?", a: "No. This is strictly a simulation tool for educational and visualization purposes. No real views are generated on YouTube." },
                            { q: "Do I need to give my YouTube password?", a: "Never. We do not require any access to your YouTube account since this is a simulation." },
                            { q: "Can I cancel my subscription?", a: "Yes, you can cancel your simulation plan at any time from your dashboard." }
                        ].map((faq, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold mb-2 flex items-center gap-3">
                                    <HelpCircle size={20} className="text-blue-400" />
                                    {faq.q}
                                </h3>
                                <p className="text-gray-400 pl-8">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Simulating?</h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                Join today and experience the most advanced YouTube growth simulator on the market.
                            </p>
                            <Link to="/register">
                                <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 font-bold">
                                    Get Started Now <ArrowRight className="ml-2 inline" size={20} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-slate-950 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                                YT Simulator
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                The world's most advanced YouTube growth simulation platform. Visualize success without the risk.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6">Product</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Simulation Engine</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Case Studies</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © 2024 YT Simulator. All rights reserved.
                        </p>
                        <p className="text-gray-600 text-xs max-w-md text-center md:text-right">
                            DISCLAIMER: This website is a simulation platform for educational purposes only.
                            We do not sell real YouTube views or engagement.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
