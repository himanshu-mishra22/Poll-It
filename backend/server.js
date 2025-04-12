const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authroute = require('./routes/authroute');
const pollRoutes = require('./routes/pollRoutes');
const app = express();
dotenv.config();


//middlewares
app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authroute);
app.use('/poll', pollRoutes);

//serving static files(upload folder)
app.use('/uploads', express.static('uploads'));

app.listen(process.env.BACKEND_PORT, () => {
    connectDB();
  console.log(`erver is running on ${process.env.BACKEND_PORT}`);
});