import express from 'express';
import { connectToDatabase } from '../components/database';
import routes from './routes';

const app = express();
const port = 3001;

app.use(express.json());

app.use('/api', routes);

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});
