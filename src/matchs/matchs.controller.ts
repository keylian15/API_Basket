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

export const createMatch = async (req: Request, res: Response) => {
  try {
    // Verification body
    const {
      game_id,
      game_date_est,
      team_abbreviation_home,
      pts_home,
      team_abbreviation_away,
      pts_away,
    } = req.body;

    if (game_id) {
      if (game_id < 0) {
        res.status(400).json({ error: "Game_id must be a positive integer" });
        return;
      }
      // Verification unicité
      const match = await prisma.match.findUnique({
        where: {
          game_id: Number(game_id),
        },
      });

      if (match) {
        res.status(400).json({ error: "Game_id already exist" });
        return;
      }
    } else {
      res.status(400).json({ error: "Missing game_id" });
      return;
    }
    if (!team_abbreviation_home) {
      res.status(400).json({ error: "Missing team home ABR" });
      return;
    }
    if (pts_home) {
      if (pts_home < 0) {
        res
          .status(400)
          .json({ error: "Pts team home must be a positive integer" });
        return;
      }
    }
    if (!team_abbreviation_away) {
      res.status(400).json({ error: "Missing team away ABR" });
      return;
    }
    if (pts_away) {
      if (pts_away < 0) {
        res
          .status(400)
          .json({ error: "Pts team away must be a positive integer" });
        return;
      }
    }

    // Creation
    const match = await prisma.match.create({
      data: {
        game_id,
        game_date_est: game_date_est + "T00:00:00.000Z",
        team_abbreviation_home,
        pts_home,
        team_abbreviation_away,
        pts_away,
      },
    });
    res.status(201).json({ message: "Match created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    // Verification parametre
    const id = req.params.gameId;

    if (!id) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    // Verification Existance
    const match = await prisma.match.findUnique({
      where: {
        game_id: Number(id),
      },
    });
    if (!match) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    // Verification body
    const {
      game_id,
      game_date_est,
      team_abbreviation_home,
      pts_home,
      team_abbreviation_away,
      pts_away,
    } = req.body;

    if (game_id) {
      if (game_id < 0) {
        res.status(400).json({ error: "Game_id must be a positive integer" });
        return;
      } else {
        // Vérification unicité
        const match = await prisma.match.findUnique({
          where: {
            game_id: Number(game_id),
            NOT: {
              game_id: Number(id),
            },
          },
        });
        if (match) {
          res.status(400).json({ error: "Game_id already exist" });
          return;
        }
      }
    } else {
      res.status(400).json({ error: "Game_id required" });
      return;
    }
    if (!team_abbreviation_home) {
      res.status(400).json({ error: "Team_home_ABR required" });
      return;
    }
    if (pts_home) {
      if (pts_home < 0) {
        res
          .status(400)
          .json({ error: "Pts_team_home must be a positive integer" });
        return;
      }
    } else {
      res.status(400).json({ error: "Pts_team_home required" });
      return;
    }
    if (!team_abbreviation_away) {
      res.status(400).json({ error: "Team_away_ABR required" });
      return;
    }
    if (pts_away) {
      if (pts_away < 0) {
        res
          .status(400)
          .json({ error: "Pts_team_away must be a positive integer" });
        return;
      }
    } else {
      res.status(400).json({ error: "Pts_team_away required" });
      return;
    }

    // Update
    await prisma.match.update({
      where: {
        game_id: Number(id),
      },
      data: {
        game_id: game_id,
        game_date_est: game_date_est,
        team_abbreviation_home: team_abbreviation_home,
        pts_home: pts_home,
        team_abbreviation_away: team_abbreviation_away,
        pts_away: pts_away,
      },
    });

    res.status(200).json({ message: "Match updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMatch = async (req: Request, res: Response) => {
  try {
    // Verification parametre
    const id = req.params.gameId;

    if (!id) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    // Verification Existance
    const match = await prisma.match.findUnique({
      where: {
        game_id: Number(id),
      },
    });
    if (!match) {
      res.status(404).json({ error: "Match not found" });
      return;
    }

    // Delete
    await prisma.match.delete({
      where: {
        game_id: Number(id),
      },
    });

    res.status(200).json({ message: "Match deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
