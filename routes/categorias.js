const {Router}=require('express');
const {check}=require('express-validator');
const { crearCategoria, showCategoria, showCategoriaID , actualizarCategoria, categoriaDelete} = require('../controllers/categorias');
const{validarJWT,validarCampos, esAdminRole }= require('../middlewares/index')
const {existeCategoriaxID}=require('../helpers/db-validators')
const router= Router()

//obtener todas las categorias -publico- paginado- total- populate
router.get('/',showCategoria)



//obtener una categoria por id -publica - populate(el ultimo) --midleware personalizado del id
router.get('/:id',[
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaxID),
    validarCampos
], showCategoriaID )

//crear categorias - privada -cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
],crearCategoria )

//actualizar un registro por id

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoriaxID),
    validarCampos
],actualizarCategoria )

//borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaxID),
    validarCampos,
    esAdminRole
    
], categoriaDelete )

module.exports=router