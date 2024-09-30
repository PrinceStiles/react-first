import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "dx6euk9rq",
  api_key: "489736614688723",
  api_secret: "LW4SLfeVsDOM8k7zE-zy8YbeC28",
});

export default cloudinary;
