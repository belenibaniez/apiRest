const {response}=require('express')
const {ObjectId}= require('mongoose').Types
const { collection } = require("../models/usuario");
const {Usuario, Categoria,Producto}= require('../models')

const coleccionesPermitidas=['usuarios','categorias','productos', 'roles']

const buscarUsuarios=async (termino='',res=response)=>{
    const isMongoID =ObjectId.isValid(termino)
    if (isMongoID){
    const usuario= await Usuario.findById(termino);
    
    return res.json({
        results:(usuario)?[usuario]:[]
    })
    }

    const regex=new RegExp(termino,'i')
    const usuarios= await Usuario.find(
        {or$:[{nombre:regex},{correo:termino}],
    $and: [{estado:true}]}
        
        );
    return res.json({
        results:(usuarios)?[usuarios]:[]
    })

}



const buscarCategorias=async (termino='',res=response)=>{
    const isMongoID =ObjectId.isValid(termino)
    if (isMongoID){
    const categoria= await Categoria.findById(termino);
    
    return res.json({
        results:(categoria)?[categoria]:[]
    })
    }

    const regex=new RegExp(termino,'i')
    const categoria= await Categoria.find(
        {nombre:regex,
    $and: [{estado:true}]}
        
        );
    return res.json({
        results:(categorias)?[categorias]:[]
    })

}


const buscarProductos=async (termino='',res=response)=>{
    const isMongoID =ObjectId.isValid(termino)
    if (isMongoID){
    const producto= await Producto.findById(termino).populate('categoria','nombre');
    
    return res.json({
        results:(producto)?[producto]:[]
    })
    }

    const regex=new RegExp(termino,'i')
    const productos= await Producto.find(
        {nombre:regex,estado:true}
        ).populate('categoria','nombre')
    return res.json({
        results:(productos)?[productos]:[]
    })

}



const buscar=(req, res )=> {
    const {coleccion,termino}= req.params;

    if (!coleccionesPermitidas.includes(coleccion))
    return res.status(400).json({
        msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
    })

    switch(coleccion){
       case  'usuarios':
        buscarUsuarios(termino, res)
           break;
        case 'categorias':
            buscarCategorias(termino,res)
            break;
        case 'productos':
            buscarProductos(termino,res)
            break;

        default:
            res.status(500).json({
                msg:'no existe esta busqueda'
            })
    }





}


 module.exports={ buscar}