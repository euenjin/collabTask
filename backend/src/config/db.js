import mongoose from 'mongoose';

export async function connectDB() {
    const dbURI = process.env.MONGODB_URI;     // Use web URL from .env file
    if (!dbURI) {
        console.error('MONGODB_URI is not defined in the environment variables');
        process.exit(1);
    }

    try{
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    }catch(err){
        console.error('MongoDB connection error:', err);                     //Ty connect, if not successful, log error and exit
        process.exit(1);
    }
}
