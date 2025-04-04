// Fichier utilisant la table nba
import { Request, Response } from "express";
import prisma from "../client";

export const getnbas = async (_req: Request, res: Response) => {
  try {
    const nbas = await prisma.nba.findMany();
    if (nbas.length === 0) {
      res.status(404).json({ error: "No nbaS info found" });
      return;
    }
    res.status(200).json({ data: nbas });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getnba = async (req: Request, res: Response) => {
  try {
    const { saison, abr } = req.params;
    // Verification parametre
    if (!saison || !abr) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const nba = await prisma.nba.findUnique({
      where: {
        abr_equipe_saison: {
          saison: Number(saison),
          abr_equipe: abr,
        },
      },
    });
    if (!nba) {
      res.status(404).json({ error: "Nba info not found" });
      return;
    }

    res.status(200).json({ data: nba });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
