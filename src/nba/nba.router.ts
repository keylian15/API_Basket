import { Router } from "express";
import { getnba, getnbas } from "./nab.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const nbaRouter = Router();
nbaRouter.get("/nbas", verifyJWT, getnbas);
nbaRouter.get("/nba/:saison/:abr", verifyJWT, getnba);
