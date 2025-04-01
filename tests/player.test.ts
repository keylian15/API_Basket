import request from "supertest";
import { app } from "../src";
import { prismaMock } from "./jest.setup";

describe("Basket API", () => {
  describe("GET /players", () => {
    it("should return 200 if players are all fetched", async () => {
      const players = [
        {
          id: 1,
          full_name: "Marty Conlon",
          first_name: "Marty",
          last_name: "Conlon",
          is_active: false,
        },
        {
          id: 2,
          full_name: "John Doe",
          first_name: "John",
          last_name: "Doe",
          is_active: true,
        },
      ];

      // Mock players -> Existes
      prismaMock.players.findMany.mockResolvedValue(players);

      const response = await request(app).get("/players");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(players);
    });
    it("should return 404 if players is empty", async () => {
      // Mock players -> Inexistant
      prismaMock.players.findMany.mockResolvedValue([]);

      const response = await request(app).get("/players");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });
    it("should return 500 if server handle errors", async () => {
      // Mock players -> Erreur
      prismaMock.players.findMany.mockRejectedValue(
        new Error("Error while fetching players")
      );
      const response = await request(app).get("/players");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Error while fetching players" });
    });
  });

  describe("GET /player", () => {
    it("should return 200 if a player is fetched", async () => {
      const player = {
        id: 1,
        full_name: "Marty Conlon",
        first_name: "Marty",
        last_name: "Conlon",
        is_active: false,
      };

      // Mock player -> Existes
      prismaMock.players.findUnique.mockResolvedValue(player);

      const response = await request(app).get("/player/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(player);
    });
    it("should return 404 if player is not found", async () => {
      // Mock player -> Inexistant
      prismaMock.players.findUnique.mockResolvedValue(null);

      const response = await request(app).get("/player/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });
    it("should return 500 if server handle errors", async () => {
      // Mock player -> Erreur
      prismaMock.players.findUnique.mockRejectedValue(
        new Error("Error while fetching player")
      );
      const response = await request(app).get("/player/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Error while fetching player" });
    });
  });
});
