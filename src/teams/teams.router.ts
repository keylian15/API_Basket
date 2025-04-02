import { Router } from "express";
import { getTeam, getTeams } from "./teams.controller";

export const teamRouter = Router();

teamRouter.get("/teams", getTeams);
teamRouter.get("/team/:saison/:arb", getTeam);
