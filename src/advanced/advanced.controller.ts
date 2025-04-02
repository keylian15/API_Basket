// Fichier utilisant la table advanced
import { Request, Response } from "express";
import prisma from "../client";

export const getAdvanceds = async (_req: Request, res: Response) => {
  try {
    const advanceds = await prisma.advanced.findMany();
    if (advanceds.length === 0) {
      res.status(404).json({ error: "No Players's advanceds info found" });
      return;
    }
    res.status(200).json({ data: advanceds });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdvanced = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  try {
    const advanced = await prisma.advanced.findUnique({
      where: {
        id_joueur: Number(id),
      },
    });

    if (!advanced) {
      res.status(404).json({ error: "Player's advanced info not found" });
      return;
    }
    res.status(200).json({ data: advanced });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
