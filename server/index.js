// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import connectDb from './config/database.js';
// import userRouter from './routes/userRoute.js';
// import resumeRouter from './routes/resumeRoute.js';
// import aiRouter from './routes/aiRoutes.js';
// dotenv.config();


// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// // app.use(cors({
// //   origin: "http://localhost:5173",
// //   credentials: true
// // }));
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://resume-builder-omega-steel.vercel.app"
//   ],
//   credentials: true
// }));

// app.options(/.*/, cors({
//   origin: [
//     "http://localhost:5173",
//     "https://resume-builder-omega-steel.vercel.app"
//   ],
//   credentials: true
// }));
// app.get('/',(req,res)=>{
//     res.send("Server is live....")
// })
// app.use('/api/users',userRouter);
// app.use('/api/ai',aiRouter)
// app.use('/api/resumes',resumeRouter);

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running on port ${port}`)
// })
// connectDb();

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDb from './config/database.js';
import userRouter from './routes/userRoute.js';
import resumeRouter from './routes/resumeRoute.js';
import aiRouter from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://resume-builder-omega-steel.vercel.app',
  'https://resume-builder-mt6rfpl87-pradip-uxs-projects.vercel.app'
];

// CORS must run before your API routes.
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is live....');
});

app.use('/api/users', userRouter);
app.use('/api/ai', aiRouter);
app.use('/api/resumes', resumeRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

connectDb();