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

classementRouter.get("/classement/joueurs/contre", verifyJWT, getClsJsContre);
classementRouter.get(
  "/classement/joueurs/contre/:id_joueur/:saison",
  verifyJWT,
  getClJsContre
);
classementRouter.get("/classement/joueurs/fg", verifyJWT, getClsJsFg);
classementRouter.get(
  "/classement/joueurs/fg/:id_joueur/:saison",
  verifyJWT,
  getClJsFg
);
classementRouter.get("/classement/joueurs/ft", verifyJWT, getClsJsFt);
classementRouter.get(
  "/classement/joueurs/ft/:id_joueur/:saison",
  verifyJWT,
  getClJsFt
);
classementRouter.get(
  "/classement/joueurs/interceptions",
  verifyJWT,
  getClsJsInterception
);
classementRouter.get(
  "/classement/joueurs/interceptions/:id_joueur/:saison",
  verifyJWT,
  getClJsInterception
);
classementRouter.get("/classement/joueurs/minutes", verifyJWT, getClsJsMinute);
classementRouter.get(
  "/classement/joueurs/minutes/:id_joueur/:saison",
  verifyJWT,
  getClJsMinute
);

classementRouter.get("/classement/joueurs/passes", verifyJWT, getClsJsPasse);
classementRouter.get(
  "/classement/joueurs/passes/:id_joueur/:saison",
  verifyJWT,
  getClJsPasse
);
classementRouter.get("/classement/joueurs/points", verifyJWT, getClsJsPt);
classementRouter.get(
  "/classement/joueurs/points/:id_joueur/:saison",
  verifyJWT,
  getClJsPt
);
classementRouter.get("/classement/joueurs/rebonds", verifyJWT, getClsJsRebond);
classementRouter.get(
  "/classement/joueurs/rebonds/:id_joueur/:saison",
  verifyJWT,
  getClJsRebond
);
classementRouter.get("/classement/joueurs/tir", verifyJWT, getClsJsTir);
classementRouter.get(
  "/classement/joueurs/tir/:id_joueur/:saison",
  verifyJWT,
  getClJsTir
);
classementRouter.get("/classement/joueurs/trois_pts", verifyJWT, getClsJs3Pt);
classementRouter.get(
  "/classement/joueurs/trois_pts/:id_joueur/:saison",
  verifyJWT,
  getClJs3Pt
);
classementRouter.get("/classement/teams/pts", verifyJWT, getClsTmPt);
classementRouter.get(
  "/classement/teams/pts/:saison/:abr_equipe",
  verifyJWT,
  getClTmPt
);
