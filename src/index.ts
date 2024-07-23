import express from 'express';
import mongoose from 'mongoose';
import postsRouter from './routes/posts';
import commentsRouter from './routes/comments';
import cors from 'cors';


const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

const MONGO_URI = 'mongodb+srv://ashenprabath:ashenprabath@cluster0.l3oznef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Change this to your MongoDB connection string

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// Database connection
try {
  mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

// Start server
app.listen(port,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
