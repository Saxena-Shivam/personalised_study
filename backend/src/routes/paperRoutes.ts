import { Router } from "express";
import { generatePaper } from "../controllers/paperController";

const router = Router();

router.post("/paper/generate-paper", generatePaper);

export default router;
