import mongoose from 'mongoose';

export function connectDB() {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
        console.error('MONGODB_URI is not defined in the environment variables');
        process.exit(1);
    }

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
}