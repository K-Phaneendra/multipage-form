import { Router } from "express";
import getConfig from "../controllers/form/get-config.js";
import submit from "../controllers/form/submit.js";

const router = Router();

router.get("/get-config", getConfig);
router.post("/submit", submit);

export default router;
