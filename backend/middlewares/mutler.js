import multer from "multer";

// const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
// export const singleUpload = multer({ storage }).single("file");

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");
