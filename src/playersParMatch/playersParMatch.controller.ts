// Fihchier utilisant la table player_par_match
import { Request, Response } from "express";
import prisma from "../client";
import { error } from "console";

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
  try {
    const { id_joueur, saison, abr } = req.params;
    if (!id_joueur || !saison || !abr) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
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

export const createPlayerParMatch = async (req: Request, res: Response) => {
  try {
    // Verification body
    const {
      saison,
      id_joueur,
      nom_joueur,
      annee_naissance,
      abr_equipe,
      minutes_jouees,
      pourcent_fg,
      pourcent_trois_pts,
      pourcent_efg,
      pourcent_ft,
      rebond,
      passe,
      interception,
      contre,
      points,
    } = req.body;

    // Verification fk (id_joueur)
    const player = await prisma.player_career_info.findUnique({
      where: {
        id_joueur: Number(id_joueur),
      },
    });

    if (!player) {
      res.status(400).json({ error: "Player not found" });
      return;
    }

    // Verification unicité
    const playerParMatch = await prisma.player_par_match.findUnique({
      where: {
        saison_id_joueur_abr_equipe: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
          abr_equipe: abr_equipe.toUpperCase(),
        },
      },
    });

    if (playerParMatch) {
      res.status(400).json({ error: "Player stat already exists" });
      return;
    }

    await prisma.player_par_match.create({
      data: {
        saison: Number(saison),
        id_joueur: Number(id_joueur),
        nom_joueur: nom_joueur,
        annee_naissance: Number(annee_naissance),
        abr_equipe: abr_equipe.toUpperCase(),
        minutes_jouees: Number(minutes_jouees),
        pourcent_fg: Number(pourcent_fg),
        pourcent_trois_pts: Number(pourcent_trois_pts),
        pourcent_efg: Number(pourcent_efg),
        pourcent_ft: Number(pourcent_ft),
        rebond: Number(rebond),
        passe: Number(passe),
        interception: Number(interception),
        contre: Number(contre),
        points: Number(points),
      },
    });

    res.status(201).json({ message: "Player stat created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlayerParMatch = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur_param, saison_param, abr } = req.params;
    if (!id_joueur_param || !saison_param || !abr) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    // Verification existance player stat
    const player = await prisma.player_par_match.findUnique({
      where: {
        saison_id_joueur_abr_equipe: {
          id_joueur: Number(id_joueur_param),
          saison: Number(saison_param),
          abr_equipe: abr.toUpperCase(),
        },
      },
    });

    if (!player) {
      res.status(404).json({ error: "Player stat not found" });
      return;
    }

    // Verification body
    const {
      saison,
      id_joueur,
      nom_joueur,
      annee_naissance,
      abr_equipe,
      minutes_jouees,
      pourcent_fg,
      pourcent_trois_pts,
      pourcent_efg,
      pourcent_ft,
      rebond,
      passe,
      interception,
      contre,
      points,
    } = req.body;

    // Verification fk (id_joueur)
    const existPlayer = await prisma.player_career_info.findUnique({
      where: {
        id_joueur: Number(id_joueur),
      },
    });

    if (!existPlayer) {
      res.status(400).json({ error: "Player not found" });
      return;
    }

    // Verification unicité
    const uniquePlayer = await prisma.player_par_match.findFirst({
      where: {
        saison: Number(saison),
        id_joueur: Number(id_joueur),
        abr_equipe: abr_equipe.toUpperCase(),
        NOT: {
          saison: Number(saison_param),
          id_joueur: Number(id_joueur_param),
          abr_equipe: abr.toUpperCase(),
        },
      },
    });

    if (uniquePlayer) {
      res.status(400).json({ error: "Player stat already exists" });
      return;
    }

    // Update
    await prisma.player_par_match.update({
      where: {
        saison_id_joueur_abr_equipe: {
          id_joueur: Number(id_joueur_param),
          saison: Number(saison_param),
          abr_equipe: abr.toUpperCase(),
        },
      },
      data: {
        saison,
        id_joueur,
        nom_joueur,
        annee_naissance,
        abr_equipe,
        minutes_jouees,
        pourcent_fg,
        pourcent_trois_pts,
        pourcent_efg,
        pourcent_ft,
        rebond,
        passe,
        interception,
        contre,
        points,
      },
    });

    res.status(200).json({ message: "Player stat updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlayerParMatch = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur_param, saison_param, abr } = req.params;
    if (!id_joueur_param || !saison_param || !abr) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    console.log(id_joueur_param, saison_param, abr);

    // Verification existance player stat
    const player = await prisma.player_par_match.findUnique({
      where: {
        saison_id_joueur_abr_equipe: {
          id_joueur: Number(id_joueur_param),
          saison: Number(saison_param),
          abr_equipe: abr.toUpperCase(),
        },
      },
    });

    if (!player) {
      res.status(404).json({ error: "Player stat not found" });
      return;
    }

    // Delete
    await prisma.player_par_match.delete({
      where: {
        saison_id_joueur_abr_equipe: {
          id_joueur: Number(id_joueur_param),
          saison: Number(saison_param),
          abr_equipe: abr.toUpperCase(),
        },
      },
    });

    res.status(200).json({ message: "Player stat deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
