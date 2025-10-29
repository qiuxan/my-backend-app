import HttpStatusCodes from "@src/common/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/common/types";
import multer from 'multer';
import path from 'path';


// create a middleware to handle file uploads

const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadWithStorageMiddleware = multer({ storage: storage }).single('img');


async function uploadFile(req: IReq, res: IRes) {
    
    const file = req.file;
    const imgUrl = `/uploads/images/${file?.filename}`;
    // Implementation for file upload
    res.status(HttpStatusCodes.CREATED)
    .json({ 
        code:1,
        message: "File uploaded successfully",
        data: {
            url: imgUrl
        }
    });
}

export default {
    uploadFile,
    uploadWithStorageMiddleware
} as const;