import { Router } from "express";
import {
  getClJs3Pt,
  getClJsContre,
  getClJsFg,
  getClJsFt,
  getClJsInterception,
  getClJsMinute,
  getClJsPasse,
  getClJsPt,
  getClJsRebond,
  getClJsTir,
  getClsJs3Pt,
  getClsJsContre,
  getClsJsFg,
  getClsJsFt,
  getClsJsInterception,
  getClsJsMinute,
  getClsJsPasse,
  getClsJsPt,
  getClsJsRebond,
  getClsJsTir,
  getClsTmPt,
  getClTmPt,
} from "./classement.controller";
import { verifyJWT } from "../commun/commun.middleware ";

export const classementRouter = Router();

classementRouter.get("/classement/joueurs/contre", getClsJsContre);
classementRouter.get(
  "/classement/joueurs/contre/:id_joueur/:saison",

  getClJsContre
);
classementRouter.get("/classement/joueurs/fg", getClsJsFg);
classementRouter.get(
  "/classement/joueurs/fg/:id_joueur/:saison",

  getClJsFg
);
classementRouter.get("/classement/joueurs/ft", getClsJsFt);
classementRouter.get(
  "/classement/joueurs/ft/:id_joueur/:saison",

  getClJsFt
);
classementRouter.get(
  "/classement/joueurs/interceptions",

  getClsJsInterception
);
classementRouter.get(
  "/classement/joueurs/interceptions/:id_joueur/:saison",

  getClJsInterception
);
classementRouter.get("/classement/joueurs/minutes", getClsJsMinute);
classementRouter.get(
  "/classement/joueurs/minutes/:id_joueur/:saison",
  getClJsMinute
);

classementRouter.get("/classement/joueurs/passes", getClsJsPasse);
classementRouter.get(
  "/classement/joueurs/passes/:id_joueur/:saison",

  getClJsPasse
);
classementRouter.get("/classement/joueurs/points", getClsJsPt);
classementRouter.get(
  "/classement/joueurs/points/:id_joueur/:saison",

  getClJsPt
);
classementRouter.get("/classement/joueurs/rebonds", getClsJsRebond);
classementRouter.get(
  "/classement/joueurs/rebonds/:id_joueur/:saison",

  getClJsRebond
);
classementRouter.get("/classement/joueurs/tir", getClsJsTir);
classementRouter.get(
  "/classement/joueurs/tir/:id_joueur/:saison",

  getClJsTir
);
classementRouter.get("/classement/joueurs/trois_pts", getClsJs3Pt);
classementRouter.get(
  "/classement/joueurs/trois_pts/:id_joueur/:saison",

  getClJs3Pt
);
classementRouter.get("/classement/teams/pts", getClsTmPt);
classementRouter.get("/classement/teams/pts/:saison/:abr_equipe", getClTmPt);
