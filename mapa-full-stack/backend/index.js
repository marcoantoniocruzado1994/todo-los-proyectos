const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const pinRoute = require('./routes/pins');
const userRoute= require('./routes/users')


require('dotenv').config();
//TODO:instanciade express
const app = express();
//TODO: Conexion a la base de datos
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((db)=>{
    console.log("bd is connection on ");
}).catch((err)=>console.log(err))
//TODO:middleawares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

//TODO: Rutas
 app.use('/api/pins',pinRoute);
 app.use('/api/users',userRoute);



//TODO:Inizialización de la aplicacion
app.listen(3000, () => {
    console.log("se inicalizo el servidor 3000 >>");
})
