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
  try {
    const { id, saison, abr } = req.params;
    if (!id) {
      res.status(400).json({ error: "Missing id" });
      return;
    }
    const advanced = await prisma.advanced.findFirst({
      where: {
        id_joueur: Number(id),
        saison: Number(saison),
        abr_equipe: abr.toUpperCase(),
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

export const createAdvanced = async (req: Request, res: Response) => {
  try {
    // Verification des champs
    const {
      id_joueur,
      saison,
      nom_joueur,
      abr_equipe,
      poste,
      per,
      annee_naissance,
    } = req.body;

    if (id_joueur) {
      if (id_joueur <= 0) {
        res.status(400).json({ error: "id_joueur must be a positive integer" });
        return;
      }
    } else {
      res.status(400).json({ error: "Missing id_joueur" });
      return;
    }
    if (saison) {
      if (saison <= 1946) {
        res.status(400).json({ error: "saison must be greater than 1946" });
        return;
      }
    } else {
      res.status(400).json({ error: "Missing saison" });
      return;
    }
    if (!nom_joueur) {
      res.status(400).json({ error: "Missing nom_joueur" });
      return;
    }
    if (!abr_equipe) {
      res.status(400).json({ error: "Missing abr_equipe" });
      return;
    }
    if (!poste) {
      res.status(400).json({ error: "Missing poste" });
      return;
    }

    // Verification unicité
    const advancedExist = await prisma.advanced.findFirst({
      where: {
        id_joueur: Number(id_joueur),
        saison: Number(saison),
        abr_equipe: abr_equipe.toUpperCase(),
      },
    });

    if (advancedExist) {
      res.status(409).json({ error: "Player's advanced info already exists" });
      return;
    }

    // Création
    await prisma.advanced.create({
      data: {
        id_joueur: Number(id_joueur),
        saison: Number(saison),
        nom_joueur: nom_joueur,
        abr_equipe: abr_equipe.toUpperCase(),
        poste: poste,
        per: per,
        annee_naissance: annee_naissance,
      },
    });

    res.status(201).json({ message: "Player's advanced info created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdvanced = async (req: Request, res: Response) => {
  try {
    // Verification des parametres
    const { id, saison_param, abr } = req.params;
    if (!id) {
      res.status(400).json({ error: "Missing id" });
      return;
    }
    if (!saison_param) {
      res.status(400).json({ error: "Missing saison" });
      return;
    }
    if (!abr) {
      res.status(400).json({ error: "Missing abr" });
      return;
    }

    // Verification des champs
    const {
      id_joueur,
      saison,
      nom_joueur,
      abr_equipe,
      poste,
      per,
      annee_naissance,
    } = req.body;
    if (!id_joueur) {
      res.status(400).json({ error: "Missing id_joueur" });
      return;
    }
    if (!saison) {
      res.status(400).json({ error: "Missing saison" });
      return;
    }
    if (!nom_joueur) {
      res.status(400).json({ error: "Missing nom_joueur" });
      return;
    }
    if (!abr_equipe) {
      res.status(400).json({ error: "Missing abr_equipe" });
      return;
    }
    if (!poste) {
      res.status(400).json({ error: "Missing poste" });
      return;
    }

    // Verification unicité
    const advancedExist = await prisma.advanced.findFirst({
      where: {
        id_joueur: Number(id_joueur),
        saison: Number(saison),
        abr_equipe: abr_equipe.toUpperCase(),
        NOT: {
          id_joueur: Number(id),
          saison: Number(saison_param),
          abr_equipe: abr.toUpperCase(),
        },
      },
    });

    if (advancedExist) {
      res.status(409).json({ error: "Player's advanced info already exists" });
      return;
    }

    // Mise à jour
    await prisma.advanced.update({
      where: {
        id_joueur_saison_abr_equipe: {
          id_joueur: Number(id),
          saison: Number(saison_param),
          abr_equipe: abr.toUpperCase(),
        },
      },
      data: {
        id_joueur: Number(id_joueur),
        saison: Number(saison),
        nom_joueur: nom_joueur,
        abr_equipe: abr_equipe.toUpperCase(),
        poste: poste,
        per: per,
        annee_naissance: annee_naissance,
      },
    });

    res.status(200).json({ message: "Player's advanced info updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAdvanced = async (req: Request, res: Response) => {
  try {
    // Verification des parametres
    const { id, saison, abr } = req.params;
    if (!id) {
      res.status(400).json({ error: "Missing id" });
      return;
    }
    if (!saison) {
      res.status(400).json({ error: "Missing saison" });
      return;
    }
    if (!abr) {
      res.status(400).json({ error: "Missing abr" });
      return;
    }
    // Verification existance
    const advancedExist = await prisma.advanced.findFirst({
      where: {
        id_joueur: Number(id),
        saison: Number(saison),
        abr_equipe: abr.toUpperCase(),
      },
    });
    if (!advancedExist) {
      res.status(404).json({ error: "Player's advanced info not found" });
      return;
    }
    // Suppression
    await prisma.advanced.delete({
      where: {
        id_joueur_saison_abr_equipe: {
          id_joueur: Number(id),
          saison: Number(saison),
          abr_equipe: abr.toUpperCase(),
        },
      },
    });
    res.status(200).json({ message: "Player's advanced info deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
