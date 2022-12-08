//initial config

import express from "express";
import { Router } from "express";
import { createRequire } from "module";


const require = createRequire(import.meta.url)
const app = express()
const router = Router();

const Company = require('./models/Company.cjs')


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
router.get('/', (req,res) => {
    res.json({
        sucess: true,
        message:"Hello Proto-capitacao"
    })
})

router.get('/company', async (req,res) => {
     //forma de fazer a requisão => /company/?cnae=xxxxx&bairro=Xxxxx | aqui tem a questao da primeira letra ser minúscula
     const bairro = req.query.bairro;
     const cnae = req.query.cnae;
     const limite = req.query.limite;
 
     
     try{
         const companies = await Company.find({
             cnae_fiscal: cnae,
             bairro
         }).limit(limite)
 
         if(companies == 0){
             res.status(422).json({message: 'Nenhum resultado encontrado com essas chaves'});
         }
        
         if(!companies){
             res.status(422).json({message: 'Não há empresas com esse cnae nesse bairro'});
             return
         }
         res.status(200).json(companies)
     }catch(error) {
         res.status(500).json({error:error})
     }
})



app.use(router)

// giving te PORT


mongoose.set('strictQuery', true)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.gdrrb.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Successfully connected to MongoDB')
    app.listen(PORT)                                    //só estou ouvindo a porta caso a API consiga conectar ao banco primeiro
})
.catch((err) => console.log(err))

