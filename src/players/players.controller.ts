// Fichier utilisant la table player_career_info
import { Request, Response } from "express";
import prisma from "../client";

export const getPlayers = async (_req: Request, res: Response) => {
  try {
    const players = await prisma.player_career_info.findMany();
    if (players.length === 0) {
      res.status(404).json({ error: "No players found" });
      return;
    }
    res.status(200).json({ data: players });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const player = await prisma.player_career_info.findUnique({
      where: {
        id_joueur: Number(id),
      },
    });

    if (!player) {
      res.status(404).json({ error: "Player not found" });
      return;
    }
    res.status(200).json({ data: player });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { nom_joueur, annee_naissance, prem_saison, dern_saison } = req.body;
    if (!nom_joueur) {
      res.status(400).json({ error: "Name required" });
      return;
    }
    if (annee_naissance) {
      if (annee_naissance < 1900) {
        res
          .status(400)
          .json({ error: "Annee_naissance must be greater than 1900" });
        return;
      }
    }
    if (!prem_saison) {
      res.status(400).json({ error: "Premier saison required" });
      return;
    } else if (prem_saison < 1946) {
      res
        .status(400)
        .json({ error: "Premier saison must be greater than 1946" });
      return;
    }
    if (!dern_saison) {
      res.status(400).json({ error: "Dernier saison required" });
      return;
    } else if (dern_saison > 2023 || dern_saison > prem_saison) {
      res.status(400).json({ error: "Dernier is invalid" });
      return;
    }
    await prisma.player_career_info.create({
      data: {
        id_joueur: 100000, // auto-incremented by the trigger
        nom_joueur,
        annee_naissance,
        prem_saison,
        dern_saison,
      },
    });
    res.status(201).json({ message: "Player created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const { id_joueur, nom_joueur, annee_naissance, prem_saison, dern_saison } =
      req.body;
    if (!id_joueur) {
      res.status(400).json({ error: "ID joueur required" });
      return;
    }
    if (!nom_joueur) {
      res.status(400).json({ error: "Name required" });
      return;
    }
    if (annee_naissance) {
      if (annee_naissance < 1900) {
        res
          .status(400)
          .json({ error: "Annee_naissance must be greater than 1900" });
        return;
      }
    }
    if (!prem_saison) {
      res.status(400).json({ error: "Premier season required" });
      return;
    } else if (prem_saison < 1946 || prem_saison > dern_saison) {
      res
        .status(400)
        .json({ error: "Premier saison is invalid (gratter than 1946)" });
      return;
    }
    if (!dern_saison) {
      res.status(400).json({ error: "Dernier season required" });
      return;
    } else if (dern_saison > 2025 || dern_saison < prem_saison) {
      res
        .status(400)
        .json({ error: "Dernier season is invalid (lower than 2025)" });
      return;
    }
    await prisma.player_career_info.update({
      where: {
        id_joueur: Number(id),
      },
      data: {
        id_joueur: Number(id_joueur),
        nom_joueur,
        annee_naissance,
        prem_saison,
        dern_saison,
      },
    });
    res.status(200).json({ message: "Player updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const playerExist = await prisma.player_career_info.findUnique({
      where: {
        id_joueur: Number(id),
      },
    });

    if (!playerExist) {
      res.status(404).json({ error: "Player not found" });
    }

    await prisma.player_career_info.delete({
      where: {
        id_joueur: Number(id),
      },
    });
    res.status(200).json({ message: "Player deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
