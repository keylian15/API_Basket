import { Request, Response } from "express";
import prisma from "../client";

export const getTeamsStatParMatch = async (_req: Request, res: Response) => {
  try {
    const teams = await prisma.team_stat_par_match.findMany();

    if (teams.length === 0) {
      res.status(404).json({ error: "No teams stat found" });
      return;
    }
    res.status(200).json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching teams stat" });
  }
};

export const getTeamStatParMatch = async (req: Request, res: Response) => {
  const { saison, arb, lg, qualif } = req.params;
  try {
    const team = await prisma.team_stat_par_match.findFirst({
      where: {
        abr_equipe: arb.toUpperCase(),
        saison: Number(saison),
        lg,
        qualif: Boolean(qualif),
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
