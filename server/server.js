const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
//const bodyParser = require('body-parser');

// Connect to database
mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
)
.then(() => console.log('DB connected'))
.catch(err => console.log(`DB connection Error: ${err}`))

// Import Routes
const authRouter = require('./routes/auth');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
//app.use(cors()); //allows all origins

if (process.env.NODE_ENV == 'development') {
    app.use(cors({ origin: 'http://localhost:3000' }));
}

// Routes Middlewares 
app.use('/api', authRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));