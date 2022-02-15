const {response} = require('express');
const bycriptjs=require('bcryptjs')
const Usuario = require('../models/usuario')
const {generarJWT}=require('../helpers/generar-jwt')


const login= async(req,res=response)=> {

    const {correo, password}= req.body;
    try{

        const usuario =await Usuario.findOne({ correo});
        if(!usuario){
            return res.status(400).json({
                msg: ' Usuarios/password no son correctos- correo'
            })
        }
        if(!usuario.estado){
            return res.status(400).json({
                msg: ' Usuarios/password no son correctos- estado'
            })
        }

        const validPasword= bycriptjs.compareSync(password,usuario.password)
        if(!validPasword){
            return res.status(400).json({
                msg: ' Usuarios/password no son correctos- passwrod'
            })
        }

       const token= await generarJWT( usuario.id );

       res.json({
           usuario,
           token
       })

        
    }catch(error){
        console.log(error)   
        res.status(500).json ({
        msg:'Comunicate con el administrador'
           }
    )}

  
}


module.exports={ login};