import { Router } from "express";
import { verifyJWT } from "../commun/commun.middleware ";
import { predictionTeam } from "./predictions.controller";

export const predictionRouter = Router();

predictionRouter.get(
  "/prediction/team/:abr_home/:abr_away",
  // verifyJWT,
  predictionTeam
);
