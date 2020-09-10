const PhotoStorage = require("./PhotoStorage");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "public/images/",
    filename: (req, file, callback)=>{
        callback(null, Date.now()+path.extname(file.originalname))
    }
  });
  
  const upload = multer({
      storage: storage,
      fileFilter: (req, file, callback)=>{
          if(!file.originalname.match(/\.(png|jpg|jpeg|jpng)$/)){
              return(callback("El archivo tiene que ser una de las siguientes extensiones: png, jpg, jpeg, jpng"));
          }
          callback(null, true);
      }
  });

function addPhoto(title, image) {
    
}

module.exports = {
    storage,
    upload,
    addPhoto,
}