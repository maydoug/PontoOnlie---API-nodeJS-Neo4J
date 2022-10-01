
require('dotenv').config()
import user from './src/routes/user'
import express, { application } from 'express'


const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded
    ({extended:true}));

// rotas
app.use('/', user)


app.listen(process.env.PORT)