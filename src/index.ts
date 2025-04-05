import express from "express";
import { teamRouter } from "./teams/teams.router";
import { playerRouter } from "./players/players.router";
import { userRouter } from "./users/users.router";
import { playerParMatchRouter } from "./playersParMatch/playersParMatch.router";
import { advancedRouter } from "./advanced/advanced.router";
import { teamStatsParMatch } from "./teamsStatsParMatch/teamsStatsParMatch.router";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { playerDirectory } from "./playersDirectory/playersDirectory.router";
import { opponentStatsParMatch } from "./opponentStatsParMatch/opponentStatsParMatch.router";
import { matchRouter } from "./matchs/matchs.router";
import { predictionRouter } from "./predictions/predictions.router";
import { classementRouter } from "./classement/classement.router";

export const app = express();
const port = 11042;

// Charger la spécification Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));

// Serveur Swagger UI à l'adresse /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(userRouter);
app.use(playerRouter);
app.use(playerParMatchRouter);
app.use(playerDirectory);
app.use(teamRouter);
app.use(teamStatsParMatch);
app.use(advancedRouter);
app.use(opponentStatsParMatch);
app.use(matchRouter);
app.use(predictionRouter);
app.use(classementRouter);

export const server = app.listen(port);

console.log(`Server is running on port ${port}`);

export function stopServer() {
  server.close();
}
