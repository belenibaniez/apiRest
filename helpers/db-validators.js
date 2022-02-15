const Role=require('../models/role');
const {Usuario, Categoria, Producto}= require('../models')
const esRoleValido  = async(rol='') => {
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol}, no esta registrado en la base de datos`)
    }
}


const existeMail= async(correo)=>{
const mail= await Usuario.findOne({correo})
if(mail){
    throw new  Error(`ese correo ${correo} ya esta registrado`)

}
}

const existeUsuarioPorId= async(id )=>{
    const existeUsuario =await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El id no existe ${id}`)
    }
}

const existeCategoriaxID= async(id)=>{
    const existeCategoria= await Categoria.findById(id);
    if (!existeCategoria){
        throw new Error(`La categoria con el ${id}  no existe`)
        }

    if (!existeCategoria.estado){
        throw new Error(`La categoria con el ${id}  no existe`)
    };

    
}

const existeProductxID= async(id )=>{
    const producto= await Producto.findById(id);
    if (!producto){
        throw new Error(`El producto con el ${id}  no existe`)

    }
    if (!producto.estado){
        throw new Error(`El producto con el ${id}  no existe`)
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas=(coleccion='', coleciones=[])=>{
const incluidas=coleccion.includes(coleccion);
if(!incluidas){
    throw new Error (`La colecciones ${coleccion} no es permitida, ${colecciones}`);

}
return true
}



module.exports= { esRoleValido, existeMail, existeUsuarioPorId, existeCategoriaxID, existeProductxID, coleccionesPermitidas}