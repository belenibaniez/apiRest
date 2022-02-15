const { modelNames } = require('mongoose');
const {Categoria, Usuario} =require('../models/index');


const crearCategoria=async(res,req=response)=>{

    const nombre=req.body.nombre.toUpperCase();
    const categoriaDB=await Categoria.findOne({nombre})
    if (categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${ categoriaDB.nombre}, ya existe`
        });
    }

    const data={
        nombre,
        usuario:req.usuario._id
    }
    const categoria= new Categoria(data);
    await categoria.save()
    res.status(201).json(categoria)

}


const showCategoria= async(req,res)=>{
    const {limite=5, desde=0}=req.query;
    const query= {estado:true};


    const [total,categorias]= await  Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario')
        .skip(Number(desde))
        .limit(Number(limite))

]);

res.json({
    total,
    categorias
})

}


const showCategoriaID= async(req,res)=>{
    const {id}=req.params;    
    const categoria= await Categoria.findById(id).populate('usuario')
res.json({
    categoria
})

}


const actualizarCategoria= async(req,res)=>{

    const {id}=req.params; 
    const nombre=req.body.nombre.toUpperCase();; 
    const usuario=req.usuario._id

    const categoria= await Categoria.findByIdAndUpdate(id,{nombre,usuario});

    res.json({
    categoria,
})
}

const categoriaDelete =async(req, res=response)=> {
    
    const {id}=req.params;
    const usuarioautenticado=req.usuario
    
    const categoria=await Categoria.findByIdAndUpdate(id, {estado:false}).populate('usuario');

    res.json({
       categoria,
       usuarioautenticado,
    })
}
 






module.exports={
    crearCategoria,
    showCategoria,
    showCategoriaID,
    actualizarCategoria,
    categoriaDelete
}