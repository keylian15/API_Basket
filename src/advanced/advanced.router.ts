import { Router } from "express";
import { getAdvanced, getAdvanceds } from "./advanced.controller";

export const advancedRouter = Router();
advancedRouter.use("/advanceds", getAdvanceds);
advancedRouter.use("/advanced", getAdvanced);
