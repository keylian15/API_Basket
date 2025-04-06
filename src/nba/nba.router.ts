import { Router } from "express";
import { getNba, getNbas } from "./nab.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const nbaRouter = Router();
nbaRouter.get("/nbas", verifyJWT, getNbas);
nbaRouter.get("/nba/:saison/:abr", verifyJWT, getNba);
