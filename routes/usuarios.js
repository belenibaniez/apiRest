const {Router}=require('express');
const {check}=require('express-validator');
const {usuarioGet, usuarioPost, usuarioPut, usuarioDelete}= require('../controllers/usuarios');
const {esRoleValido, existeMail, existeUsuarioPorId}=require('../helpers/db-validators')

const{validarJWT,validarExistenciaUsuario,validarCampos,esAdminRole,tieneRol}= require('../middlewares')

const router= Router()

router.get('/', usuarioGet);


router.post('/',
[
    check('correo','El correo no es valido').isEmail(), 
    check('correo').custom((correo)=> existeMail(correo)),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    check('rol').custom( (rol)=>esRoleValido(rol)),
    //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos


], usuarioPost
);

router.put('/:id', usuarioPut, [
check('id', 'No es un ID Valido').isMongoId(),
check('id').custom(existeUsuarioPorId),
check('rol').custom( (rol)=>esRoleValido(rol)),
validarCampos


]);

router.delete('/:id',  [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    validarExistenciaUsuario,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),

    validarCampos
    
    
    ], usuarioDelete);
    


module.exports=router