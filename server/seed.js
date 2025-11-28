import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';
import Plan from './src/models/Plan.js';

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'ADMIN',
    },
    {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'user123',
        role: 'USER',
    },
];

const plans = [
    // View Boost Plans
    {
        name: '1,000 Views Boost',
        description: 'Get 1,000 simulated views for your YouTube video',
        price: 29,
        features: ['1,000 Simulated Views', 'Instant Delivery', '24/7 Support', 'Demo Only'],
        type: 'VIEWS',
    },
    {
        name: '5,000 Views Boost',
        description: 'Get 5,000 simulated views for your YouTube video',
        price: 99,
        features: ['5,000 Simulated Views', 'Instant Delivery', 'Priority Support', 'Demo Only'],
        type: 'VIEWS',
    },
    {
        name: '10,000 Views Boost',
        description: 'Get 10,000 simulated views for your YouTube video',
        price: 179,
        features: ['10,000 Simulated Views', 'Instant Delivery', 'VIP Support', 'Demo Only'],
        type: 'VIEWS',
    },
    {
        name: '50,000 Views Boost',
        description: 'Get 50,000 simulated views for your YouTube video - Premium Package',
        price: 499,
        features: ['50,000 Simulated Views', 'Instant Delivery', 'Dedicated Support', 'Demo Only', 'Analytics'],
        type: 'VIEWS',
    },
    // Service Plans
    {
        name: 'SEO Optimization',
        description: 'Comprehensive SEO audit and optimization for your YouTube channel',
        price: 99,
        features: ['Keyword Research', 'Title Optimization', 'Description Enhancement', 'Tag Strategy'],
        type: 'SEO',
    },
    {
        name: 'Premium Thumbnail Design',
        description: 'Professional thumbnail design to boost CTR',
        price: 49,
        features: ['Custom Design', 'A/B Testing', '3 Revisions', 'High Resolution'],
        type: 'THUMBNAIL',
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Plan.deleteMany();

        // Create users
        console.log('Seeding users...');
        await User.insertMany(users);
        console.log('✓ Users seeded');

        // Create plans
        console.log('Seeding plans...');
        await Plan.insertMany(plans);
        console.log('✓ Plans seeded');

        console.log('\n✅ Database seeded successfully!');
        console.log('\nTest Credentials:');
        console.log('Admin: admin@example.com / admin123');
        console.log('User:  user@example.com / user123');
        console.log('\nView Boost Plans: 1K, 5K, 10K, 50K views');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
