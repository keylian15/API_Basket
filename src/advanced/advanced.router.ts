import { Router } from "express";
import {
  createAdvanced,
  deleteAdvanced,
  getAdvanced,
  getAdvanceds,
  updateAdvanced,
} from "./advanced.controller";

export const advancedRouter = Router();
advancedRouter.get("/advanceds", getAdvanceds);
advancedRouter.get("/advanced/:id/:saison/:abr", getAdvanced);
advancedRouter.post("/advanced/", createAdvanced);
advancedRouter.patch("/advanced/:id/:saison_param/:abr", updateAdvanced);
advancedRouter.delete("/advanced/:id/:saison/:abr", deleteAdvanced);
