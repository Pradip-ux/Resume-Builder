import multer, { diskStorage } from "multer";

const storage = diskStorage({});

const uplaod = multer({storage})

export default uplaod;