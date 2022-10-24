// external imports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

// internal imports
const userRouter = require('./routers/userRoute')
const transactionRouter = require('./routers/transactionRoute')

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())

// body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// passport
app.use(passport.initialize())
require('./passport')(passport)

// routes
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our application"
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server in running at http://localhost:${PORT}`);
    mongoose.connect('mongodb://localhost:/money-management-app',
    {useNewUrlParser: true},
    () => {
        console.log('Database Connected Successfully...');
    });
})