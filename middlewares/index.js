
const  validarJWT  = require('../middlewares/validar-jwt');
const validarExistenciaUsuario  = require('../middlewares/validar-usuarioaeliminar');
const  validarCampos  = require('../middlewares/validar-campos');
const validarRole= require('../middlewares/validar-role')
const validarArchivo= require('../middlewares/validar-archivo')

module.exports={
    ...validarCampos,
    ...validarJWT,
    ...validarRole,
    ...validarExistenciaUsuario,
    ...validarArchivo
}