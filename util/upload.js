import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:(req, res, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, res, cb) => {
        const date = Date.now();
        const ext = path.extname(req.file.originalname);
        const name = date + ext;

        cb(null, name);
    }
})

const upload = new multer({
    storage:storage,
    limits:{
        fileSize:1000000
    },
    fileFilter: (req, res, cb) => {
        const mime = req.file.mimetype;
        if(mime === "image/jpeg" ||mime === "image/jpg" || mime === "image/png"){
            cb(null, true);
        }
        else{
            cb(null, false);
        }
    }  
})

export default upload;