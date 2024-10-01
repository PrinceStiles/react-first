import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.post("/register", registerCompany);
router.get("/get", getCompany);
router.get("/get/:id", getCompanyById);
router.put("/update/:id", singleUpload, updateCompany);

export default router;
