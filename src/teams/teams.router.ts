import { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
} from "./teams.controller";
import { verifyJWT } from "../commun/commun.midleware";

export const teamRouter = Router();

teamRouter.get("/teams", getTeams);
teamRouter.get("/team/:saison/:abr", getTeam);
teamRouter.post("/team", verifyJWT, createTeam);
teamRouter.patch("/team/:saison_param/:abr_param", verifyJWT, updateTeam);
teamRouter.delete("/team/:saison/:abr", verifyJWT, deleteTeam);
