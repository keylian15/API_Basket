import { Router } from "express";
import { getTeam, getTeams } from "./teams.controller";

export const teamsRouter = Router();

teamsRouter.get("/teams", getTeams);
teamsRouter.get("/team/:id", getTeam);
