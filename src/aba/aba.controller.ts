// Fichier utilisant la table aba
import { Request, Response } from "express";
import prisma from "../client";

export const getAbas = async (_req: Request, res: Response) => {
  try {
    const abas = await prisma.aba.findMany();
    if (abas.length === 0) {
      res.status(404).json({ error: "No abaS info found" });
      return;
    }
    res.status(200).json({ data: abas });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAba = async (req: Request, res: Response) => {
  try {
    const { saison, abr } = req.params;
    // Verification parametre
    if (!saison || !abr) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const aba = await prisma.aba.findUnique({
      where: {
        abr_equipe_saison: {
          saison: Number(saison),
          abr_equipe: abr,
        },
      },
    });
    if (!aba) {
      res.status(404).json({ error: "Aba info not found" });
      return;
    }

    res.status(200).json({ data: aba });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
