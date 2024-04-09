//version anterior commonJS
//const express = require('express')

import express from 'express'
import router from './routes/index.js';
import db from './config/db.js'





//conectar la base de datos

db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error =>console.log(error))


const app = express()

//definimos puerto

const port = process.env.PORT || 4000

//habilitar pug
app.set('view engine', 'pug')

//obtener el año actual 
app.use( (req,res,next)=>{
    const year = new Date()
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes'
    next()
})

// body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

// definir la carpeta publica
app.use(express.static('public'))

//Router
app.use('/', router)


//inicia server 

app.listen(port,()=>{
    console.log(`el servidor esta funcionando en el puerto: ${port}`);





})