import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.get("/apply/:id", applyJob);
router.get("/get", getAppliedJobs);
router.get("/:id/applicants", getApplicants);
router.post("/status/:id/update", updateStatus);

export default router;
