// Fihchier utilisant la table player_par_match
import { Request, Response } from "express";
import prisma from "../client";

export const getPlayersParMatch = async (_req: Request, res: Response) => {
  try {
    const players = await prisma.player_par_match.findMany();
    if (players.length === 0) {
      res.status(404).json({ error: "No players stat found" });
      return;
    }
    res.status(200).json({ data: players });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlayerParMatch = async (req: Request, res: Response) => {
  const { id_joueur, saison, abr } = req.params;

  try {
    const player = await prisma.player_par_match.findFirst({
      where: {
        id_joueur: Number(id_joueur),
        saison: Number(saison),
        abr_equipe: abr.toUpperCase(),
      },
    });

    if (!player) {
      res.status(404).json({ error: "Player stat not found" });
      return;
    }
    res.status(200).json({ data: player });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
