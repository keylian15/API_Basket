// Fichier utilisant la table match
import { Request, Response } from "express";
import prisma from "../client";

export const getMatchs = async (_req: Request, res: Response) => {
  try {
    const matchs = await prisma.match.findMany();
    if (matchs.length === 0) {
      res.status(404).json({ error: "No matchs found" });
    } else {
      res.status(200).json({ data: matchs });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.gameId;
    if (!id) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const match = await prisma.match.findUnique({
      where: {
        game_id: Number(id),
      },
    });
    if (!match) {
      res.status(404).json({ error: "Match not found" });
    } else {
      res.status(200).json({ data: match });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
