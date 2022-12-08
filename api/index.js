//initial config

import express from "express";
import { Router } from "express";

import { createRequire } from "module";



const require = createRequire(import.meta.url)
const app = express()
const route = Router();

const mongoose = require('mongoose')

require('dotenv').config()



const PORT = 3003


//wai to read JSON

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(express.json())

// initial route/endpoint
route.get('/', (req,res) => {
    res.json({
        sucess: true,
        message:"Hello"
    })
})

route.get('/company', (req,res) => {
    res.json({
        sucess: true,
        message:"Here your companies"
    })
})



app.use(route)

// giving te PORT


mongoose.set('strictQuery', true)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.gdrrb.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Successfully connected to MongoDB')
    app.listen(PORT)                                    //só estou ouvindo a porta caso a API consiga conectar ao banco primeiro
})
.catch((err) => console.log(err))

// app.listen(PORT, () => {
//     console.log("Server is running in " + PORT)
// })
