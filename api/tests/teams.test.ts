import request from "supertest";
import { app } from "../src";
import { prismaMock } from "./jest.setup";

describe("Basket API", () => {
  describe("GET /teams", () => {
    it("should return 200 if teams are all fetched", async () => {
      const teams = [
        {
          id: BigInt(1),
          full_name: "Atlanta Hawks",
          abbreviation: "ATL",
          nickname: "Hawks",
          city: "Atlanta",
          state: "Atlanta",
          year_founded: 1949,
        },
        {
          id: BigInt(2),
          full_name: "Boston Celtics",
          abbreviation: "BOS",
          nickname: "Celtics",
          city: "Boston",
          state: "Massachusetts",
          year_founded: 1946,
        },
      ];

      // Mock teams -> Existes
      prismaMock.teams.findMany.mockResolvedValue(teams);

      const response = await request(app).get("/teams");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(teams);
    });
    it("should return 404 if teams is empty", async () => {
      // Mock teams -> Inexistant
      prismaMock.teams.findMany.mockResolvedValue([]);

      const response = await request(app).get("/teams");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });
    it("should return 500 if server handle errors", async () => {
      // Mock teams -> Erreur
      prismaMock.teams.findMany.mockRejectedValue(
        new Error("Error while fetching teams")
      );
      const response = await request(app).get("/teams");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Error while fetching teams" });
    });
  });

  describe("GET /team", () => {
    it("should return 200 if a team is fetched", async () => {
      const team = {
        id: BigInt(1),
        full_name: "Boston Celtics",
        abbreviation: "BOS",
        nickname: "Celtics",
        city: "Boston",
        state: "Massachusetts",
        year_founded: 1946,
      };

      // Mock team -> Existes
      prismaMock.teams.findUnique.mockResolvedValue(team);

      const response = await request(app).get("/team/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(team);
    });
    it("should return 404 if team is not found", async () => {
      // Mock team -> Inexistant
      prismaMock.teams.findUnique.mockResolvedValue(null);

      const response = await request(app).get("/team/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });
    it("should return 500 if server handle errors", async () => {
      // Mock team -> Erreur
      prismaMock.teams.findUnique.mockRejectedValue(
        new Error("Error while fetching team")
      );
      const response = await request(app).get("/team/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Error while fetching team" });
    });
  });
});
