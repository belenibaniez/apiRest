const {response}= require('express');
const fs=require('fs')
const { model } = require('mongoose');
const { subirArchivo } = require('../helpers/subir-archivo');
const {Usuario, Producto}=require('../models')
const path= require('path')


const cargarArchivo= async(req,res)=>{
    try{
        const nombre= await subirArchivo(req.files)
        res.json({
            nombre
        })
    }catch(msg){
res.status(400).json({msg});
    }
   

}



const actualizarImagen= async (req,res=response)=>{

const{id, coleccion}= req.params;

let modelo;

switch(coleccion){
    case 'usuarios':
        modelo= await Usuario.findById(id);
        if(!modelo){
            return res.status(400).json({
                msg:`No existe un usuario con el ID ${id}`
            })
        }
        break;
        case 'productos':
        modelo= await Producto.findById(id);
        if(!modelo){
            return res.status(400).json({
                msg:`No existe un producto con el ID ${id}`
            })
        }
        break;
    default:
        return res.status(400).json({msg:'no existen otras colecciones'})

}

if (modelo.img){
    const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img)
    if (fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen)
    }
}



const nombre= await subirArchivo(req.files, undefined,coleccion);
modelo.img=nombre;
await modelo.save();
res.json(
    modelo
)



}


const mostrarImagen=async (req,res=response)=>{

    const {id, coleccion}=req.params;
    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo= await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el ID ${id}`
                })
            }
            break;
            case 'productos':
            modelo= await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el ID ${id}`
                })
            }
            break;
        default:
            return res.status(400).json({msg:'no existen otras colecciones'})
    
    }
    
    if (modelo.img){
        const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img)
        if (fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
        


        
    }
    const placeholder=path.join(__dirname,'../assents/no-image.jpg')
    return res.sendFile(placeholder)
    

}



module.exports={
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}