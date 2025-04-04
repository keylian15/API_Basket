import { Router } from "express";
import { getAba, getAbas } from "./aba.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const abaRouter = Router();
abaRouter.get("/abas", verifyJWT, getAbas);
abaRouter.get("/aba/:saison/:abr", verifyJWT, getAba);
