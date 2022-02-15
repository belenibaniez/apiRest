const {Router}=require('express');
const {check}=require('express-validator');
const{validarJWT,validarCampos, esAdminRole }= require('../middlewares/index')
const{existeCategoriaxID, existeProductxID} =require('../helpers/db-validators')
const {productoCrear,productoObtener, productoxID, productoActualizar, productoDelete}= require('../controllers/productos')
const router= Router()

//obtener todas las categorias -publico- paginado- total- populate
router.get('/',productoObtener)


//obtener una categoria por id -publica - populate(el ultimo) --midleware personalizado del id
router.get('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProductxID),
    validarCampos
], productoxID )
 
//crear Producto - privada -cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id_categoria', 'La categoria es obligatoria').notEmpty(),
    check('id_categoria', 'No es un ID Valido').isMongoId(),
    check('id_categoria').custom(existeCategoriaxID),
    validarCampos
],productoCrear )

//actualizar un registro por id

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProductxID),
   validarCampos
],productoActualizar )


//borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeProductxID),
    validarCampos,
    esAdminRole
    
], productoDelete )

module.exports=router