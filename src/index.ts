import express from "express";
import { teamsRouter } from "./teams/teams.router";
import { playerRouter } from "./players/players.router";
import { userRouter } from "./users/users.router";
import { playerParMatchRouter } from "./playersParMatch/playersParMatch.router";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { advancedRouter } from "./advanced/advanced.router";

export const app = express();
const port = 1142;

// Charger la spécification Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));

// Serveur Swagger UI à l'adresse /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(userRouter);
app.use(teamsRouter);
app.use(playerRouter);
app.use(playerParMatchRouter);
app.use(advancedRouter);

export const server = app.listen(port);

console.log(`Server is running on port ${port}`);

export function stopServer() {
  server.close();
}
