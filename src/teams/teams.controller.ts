import { Request, Response } from "express";
import prisma from "../client";

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany();

    if (teams.length === 0) {
      res.status(404).json({ error: "No teams found" });
      return;
    }
    res.status(200).json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching teams" });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  const { saison, arb } = req.params;
  if (!saison || !arb) {
    res.status(400).json({ error: "Missing parameters" });
    return;
  }
  try {
    const team = await prisma.team.findFirst({
      where: {
        abr_equipe: arb,
        saison: Number(saison),
      },
    });

    if (!team) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    res.status(200).json({ data: team });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching team" });
  }
};
