import { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
} from "./teams.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const teamRouter = Router();

teamRouter.get("/teams", verifyJWT, getTeams);
teamRouter.get("/team/:saison/:abr", verifyJWT, getTeam);
teamRouter.post("/team", verifyJWT, createTeam);
teamRouter.patch(
  "/team/:saison_param/:abr_param",
  verifyJWT,
  verifyAdmin,
  updateTeam
);
teamRouter.delete("/team/:saison/:abr", verifyJWT, verifyAdmin, deleteTeam);
