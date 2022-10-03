
require('dotenv').config()
import user from './src/routes/user'
import express from 'express'
const cors = require('cors');

const app = express()
app.use(cors());

// middlewares
app.use(express.json())
app.use(express.urlencoded
    ({ extended: true }));

// rotas
app.use('/', user)


app.listen(process.env.PORT)