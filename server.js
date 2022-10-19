require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRouter = require('./routers/userRoute')

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())

// body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes
app.use('/api/users', userRouter);


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our application"
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server in running at http://localhost:${PORT}`);
    mongoose.connect('mongodb://localhost:27017/money-management-app',
    {useNewUrlParser: true},
    () => {
        console.log('Database Connected Successfully...');
    });
})