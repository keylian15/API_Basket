import { Request, Response } from "express";
import prisma from "../client";

export const getOpponentsStatsParMatch = async (
  _req: Request,
  res: Response
) => {
  try {
    const OpponentsStatsParMatch =
      await prisma.opponent_stats_par_match.findMany();

    if (OpponentsStatsParMatch.length === 0) {
      res.status(404).json({ error: "No Opponents's stats par match found" });
      return;
    }
    res.status(200).json({ data: OpponentsStatsParMatch });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching opponents's stats par match" });
  }
};

export const getOpponentStatsParMatch = async (req: Request, res: Response) => {
  try {
    const { saison, abr } = req.params;
    if (!saison || !abr) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const playerDirectory = await prisma.opponent_stats_par_match.findFirst({
      where: {
        saison: Number(saison),
        abr_equipe: abr.toUpperCase(),
      },
    });

    if (!playerDirectory) {
      res.status(404).json({ error: "Opponent's stats par match not found" });
      return;
    }

    res.status(200).json({ data: playerDirectory });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching opponent's stats par match" });
  }
};
