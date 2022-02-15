const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {dbConnection}=require('../database/config');
class Server{
    constructor (){
        this.app =express();
        this.port= process.env.PORT
        this.paths={
            auth:'/api/auth',
            usuarios:'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar',
            uploads:'/api/uploads'



        }
      

        //conectarme a la base de datos
        this.conectarDB()


        //Middlewares

        this.middlewares()

    



        //rutas de la app



        this.routes();
    }


    middlewares(){
        //directorio publico
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use(express.static('public'));

        //Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    async conectarDB(){
        await dbConnection()

    }

    routes(){
      //  this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.auth, require('../routes/auth'));
        //this.app.use( this.paths.categorias, require('../routes/categorias'));
        //this.app.use( this.paths.productos, require('../routes/productos'));
        //this.app.use( this.paths.buscar, require('../routes/buscar'));
        //this.app.use( this.paths.uploads, require('../routes/uploads'));


    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }



}

module.exports= Server