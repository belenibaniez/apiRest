const jwt = require('jsonwebtoken');
const Usuario= require('../models/usuario');
const { param } = require('../routes/auth');
const validarExistenciaUsuario= async (req,res,next) => {

    const {id} = req.param('id');
    const usuario= await Usuario.findById(id);
    if (!usuario){
         return res.status(401).json({msg:'usuario no existente'})

    }
    if (!usuario.estado){
        return  res.status(401).json({msg:'usuario se encuentra eliminado'})

    }

    next ();

    



}


module.exports = {
    validarExistenciaUsuario
}