import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('*', (req, res) => {
	res.status(404).json({ message: 'Page Not Found' });
});
app.use(errorHandler);

export default app;
