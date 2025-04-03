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
    const { nom_joueur, date_naissance } = req.params;
    if (!nom_joueur || !date_naissance) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const playerDirectory = await prisma.player_directory.findFirst({
      where: {
        nom_joueur: nom_joueur,
        date_naissance: date_naissance + "T00:00:00.000Z",
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

export const createPlayerDirectory = async (req: Request, res: Response) => {
  try {
    // Verification body
    const { nom_joueur, date_naissance, taille, poids } = req.body;
    if (!nom_joueur) {
      res.status(400).json({ error: "nom_joueur required" });
      return;
    }

    if (!date_naissance) {
      res.status(400).json({ error: "date_naissance required" });
      return;
    }

    // Verification exist
    const existPlayerDirectory = await prisma.player_directory.findFirst({
      where: {
        nom_joueur: nom_joueur,
        date_naissance: date_naissance + "T00:00:00.000Z",
      },
    });

    if (existPlayerDirectory) {
      res.status(400).json({ error: "Player's directory already exists" });
      return;
    }

    // Création
    await prisma.player_directory.create({
      data: {
        nom_joueur,
        date_naissance: date_naissance + "T00:00:00.000Z",
        taille,
        poids,
      },
    });

    res.status(201).json({ message: "Player's directory created" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error while creating player's directory",
      message: error.message,
    });
  }
};

export const updatePlayerDirectory = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { nom_joueur_param, date_naissance_param } = req.params;
    if (!nom_joueur_param || !date_naissance_param) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    // Verification exist
    const existPlayerDirectory = await prisma.player_directory.findFirst({
      where: {
        nom_joueur: nom_joueur_param,
        date_naissance: date_naissance_param + "T00:00:00.000Z",
      },
    });

    if (!existPlayerDirectory) {
      res.status(404).json({ error: "Player's directory not found" });
      return;
    }

    // Verification body
    const { nom_joueur, date_naissance, taille, poids } = req.body;
    if (!nom_joueur) {
      res.status(400).json({ error: "nom_joueur required" });
      return;
    }
    if (!date_naissance) {
      res.status(400).json({ error: "date_naissance required" });
      return;
    }

    // Verification unicité
    const playerDirectory = await prisma.player_directory.findFirst({
      where: {
        nom_joueur: nom_joueur,
        date_naissance: date_naissance + "T00:00:00.000Z",
        NOT: {
          nom_joueur: nom_joueur_param,
          date_naissance: date_naissance_param + "T00:00:00.000Z",
        },
      },
    });

    if (playerDirectory) {
      res.status(400).json({ error: "Player's directory already exists" });
      return;
    }

    // Update
    await prisma.player_directory.update({
      where: {
        nom_joueur_date_naissance: {
          nom_joueur: nom_joueur_param,
          date_naissance: date_naissance_param + "T00:00:00.000Z",
        },
      },
      data: {
        nom_joueur,
        date_naissance: date_naissance + "T00:00:00.000Z",
        taille,
        poids,
      },
    });

    res.status(200).json({ message: "Player's directory updated" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error while updating player's directory",
      message: error.message,
    });
  }
};

export const deletePlayerDirectory = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { nom_joueur_param, date_naissance_param } = req.params;
    if (!nom_joueur_param || !date_naissance_param) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    // Verification exist
    const existPlayerDirectory = await prisma.player_directory.findFirst({
      where: {
        nom_joueur: nom_joueur_param,
        date_naissance: date_naissance_param + "T00:00:00.000Z",
      },
    });

    if (!existPlayerDirectory) {
      res.status(404).json({ error: "Player's directory not found" });
      return;
    }

    // Delete
    await prisma.player_directory.delete({
      where: {
        nom_joueur_date_naissance: {
          nom_joueur: nom_joueur_param,
          date_naissance: date_naissance_param + "T00:00:00.000Z",
        },
      },
    });
    res.status(200).json({ message: "Player's directory deleted" });
  } catch (error: any) {
    res.status(500).json({ error: "Error while deleting player's directory" });
  }
};
