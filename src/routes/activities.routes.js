import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getActivities,
  createActivities,
  getActivitie,
  updateActivities,
  deleteActivities,
} from "../controllers/activite.controller.js";
const router = Router();

router.get("/activities", authRequired, getActivities);

router.get("/activities/:id", authRequired, getActivitie);

router.post("/activities", authRequired, createActivities);

router.put("/activities/:id", authRequired, updateActivities);

router.delete("/activities/:id", authRequired, deleteActivities);

export default router;
