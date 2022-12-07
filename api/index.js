//initial config

import express from "express";
import { Router } from "express";

const app = express()
const route = Router();


const PORT = 3003


//wai to read JSON

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.unsubscribe(express.json())

// initial route/endpoint
route.get('/', (req,res) => {
    res.json({
        sucess: true,
        message:"Hello"
    })
})

app.use(route)

// giving te PORT

app.listen(PORT, () => {
    console.log("Server is running in " + PORT)
})
