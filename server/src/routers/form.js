import { Router } from "express";
import getConfig from "../controllers/form/get-config.js";

const router = Router();

router.get("/get-config", getConfig);

export default router;
