import { Router } from "express";
import {
  createAdvanced,
  deleteAdvanced,
  getAdvanced,
  getAdvanceds,
  updateAdvanced,
} from "./advanced.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const advancedRouter = Router();
advancedRouter.get("/advanceds", verifyJWT, getAdvanceds);
advancedRouter.get("/advanced/:id/:saison/:abr", verifyJWT, getAdvanced);
advancedRouter.post("/advanced/", verifyJWT, verifyAdmin, createAdvanced);
advancedRouter.patch(
  "/advanced/:id/:saison_param/:abr",
  verifyJWT,
  verifyAdmin,
  updateAdvanced
);
advancedRouter.delete(
  "/advanced/:id/:saison/:abr",
  verifyJWT,
  verifyAdmin,
  deleteAdvanced
);
