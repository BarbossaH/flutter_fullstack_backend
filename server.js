import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
//configure env
dotenv.config();
//database config
connectDB();

const app = express();
app.use(express.json());
//routes
app.use('/api/auth', authRoutes);

// PORT
const PORT = process.env.PORT || 3500;
//run and listen
// app.listen(PORT, () => {
//   console.log(
//     `Server run on model ${process.env.DEV_MODE} on PORT: ${PORT}`.bgCyan.white
//   );
// });
// app.listen(PORT, '169.254.143.238', () => {
// app.listen(PORT, '127.0.0.1', () => {
app.listen(PORT, '192.168.68.103', () => {
  console.log(
    `Server run on model ${process.env.DEV_MODE} on PORT: ${PORT}`.bgCyan.white
  );
});
