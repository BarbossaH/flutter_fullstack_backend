import express from 'express';
import colors from 'colors';

import authRoutes from './routes/authRoutes.js';

const app = express();

//routes
app.use('/api/auth', authRoutes);

// PORT
const PORT = process.env.PORT || 3500;
//run and listen
app.listen(PORT, () => {
  console.log(
    `Server run on model ${process.env.DEV_MODE} on PORT: ${PORT}`.bgCyan.white
  );
});
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(
//     `Server run on model ${process.env.DEV_MODE} on PORT: ${PORT}`.bgCyan.white
//   );
// });
