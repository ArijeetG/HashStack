import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import requestIp from 'request-ip';
import adminRouter from './routes/adminRoutes';
import { addAdminMigration } from './migrations/addAdmin';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cors());
app.use(requestIp.mw());

mongoose.connect(String(process.env.MONGO_URI));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', async () => {
    console.log('Connected to DB ✔️');
    await addAdminMigration();
});

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server running ✔️'));
