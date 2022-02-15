const { body } = require('express-validator');
const { modelNames } = require('mongoose');
const {Categoria, Usuario, Producto} =require('../models/index');


const productoCrear=async(req,res=response)=>{

    const {estado, nombre, id_categoria,...body}= req.body
    body.nombre=body.nombre.toUpperCase();

    const producto_db=await Producto.findOne(body.nombre)
    if (producto_db){
        return res.status(400).json({
            msg:`El producto ${ producto_db.nombre}, ya existe`
        });
    }

    const data={
        nombre,
        ...body,
        categoria:id_categoria,
   
        usuario:req.usuario._id
    }
    const producto= new Producto(data);
    await producto.save()
    res.status(201).json(producto)

}


const productoObtener= async(req,res)=>{
    const {limite=5, desde=0}=req.query;
    const query= {estado:true};


    const [total,producto]= await  Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario')
        .populate('categoria')
        .skip(Number(desde))
        .limit(Number(limite))

]);

res.json({
    total,
    producto
})

}


const productoxID= async(req,res)=>{
    const {id}=req.params;    
    const producto= await Producto.findById(id)
    .populate('usuario')
    .populate('categoria')
res.json({
    producto
})

}


const productoActualizar= async(req,res)=>{

    const {id}=req.params; 
    const {estado,usuario,id_categoria,...body}=req.body; 

    if (body.nombre){
        body.nombre=body.nombre.toUpperCase();

    }

    body.usuario=req.usuario._id
    body.categoria=id_categoria

    const producto= await Producto.findByIdAndUpdate(id,body);

    res.json({
    producto,
})
}

const productoDelete =async(req, res=response)=> {
    
    const {id}=req.params;
    const usuarioautenticado=req.usuario
    
    const producto=await Producto.findByIdAndUpdate(id, {estado:false}).populate('usuario');

    res.json({
       producto,
       usuarioautenticado,
    })
}
 



module.exports={
    productoCrear,
    productoObtener,
    productoxID,
    productoActualizar,
    productoDelete
  
}