import { Request, Response } from "express";
import prisma from "../client";

export const getPlayersDirectory = async (_req: Request, res: Response) => {
  try {
    const playersDirectory = await prisma.player_directory.findMany();

    if (playersDirectory.length === 0) {
      res.status(404).json({ error: "No players's directory found" });
      return;
    }
    res.status(200).json({ data: playersDirectory });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching players's directory" });
  }
};

export const getPlayerDirectory = async (req: Request, res: Response) => {
  try {
    const { nom_joueur, dateNaissance } = req.params;
    if (!nom_joueur || !dateNaissance) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const playerDirectory = await prisma.player_directory.findFirst({
      where: {
        nom_joueur: nom_joueur,
        date_naissance: dateNaissance,
      },
    });

    if (!playerDirectory) {
      res.status(404).json({ error: "Player's directory not found" });
      return;
    }

    res.status(200).json({ data: playerDirectory });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching player's directory" });
  }
};
