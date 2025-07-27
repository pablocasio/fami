import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import {
  getActivities,
  createActivities,
  getActivitie,
  updateActivities,
  deleteActivities,
} from "../controllers/activite.controller";
const router = Router();

router.get("/activites", authRequired, getActivities);

router.get("/activites/:id", authRequired, getActivitie);

router.post("/activites", authRequired, createActivities);

router.put("/activites/:id", authRequired, updateActivities);

router.delete("/activites/:id", authRequired, deleteActivities);

export default router;
