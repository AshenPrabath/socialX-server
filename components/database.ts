import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ashenprabath:ashenprabath@cluster0.l3oznef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Change this to your MongoDB connection string

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
