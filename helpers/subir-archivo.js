const path=require('path')
const { v4: uuidv4 } = require('uuid');


const subirArchivo=(files, extencionesValidas=['png','jpg','jpeg'], carpeta='')=>{
    return new Promise((resolve, reject)=>{
        const {archivo} = files;
        const nombreCortado=archivo.name.split('.');
        const extension= nombreCortado[nombreCortado.length-1]
    
        //validar extension
        if (!extencionesValidas.includes(extension)){

            return reject (`La extension ${extensiones} no es permitida, ${extencionesValidas}`);
            }
    
        const nombreTemp=uuidv4()+'.'+extension;
    
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);
    
      
        archivo.mv(uploadPath, function(err) {
          if (err) {
          reject(err);
          }
      
         resolve(nombreTemp);
        });

    })

}


module.exports= { subirArchivo}