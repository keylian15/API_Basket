import express from "express";
import { teamsRouter } from "./teams/teams.router";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export const app = express();
const port = 3000;

// Charger la spécification Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));

// Serveur Swagger UI à l'adresse /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(teamsRouter);

export const server = app.listen(port);

export function stopServer() {
  server.close();
}
