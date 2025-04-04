import { Request, Response } from "express";
import prisma from "../client";

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany();

    if (teams.length === 0) {
      res.status(404).json({ error: "No teams found" });
      return;
    }
    res.status(200).json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching teams" });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { saison, abr } = req.params;
    if (!saison || !abr) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const team = await prisma.team.findFirst({
      where: {
        abr_equipe: abr.toUpperCase(),
        saison: Number(saison),
      },
    });

    if (!team) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    res.status(200).json({ data: team });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching team" });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { abr_equipe, team_name, saison } = req.body;
    if (!abr_equipe) {
      res.status(400).json({ error: "Missing abr_equipe parameter" });
      return;
    }
    if (!team_name) {
      res.status(400).json({ error: "Missing team_name parameter" });
      return;
    }
    if (!saison) {
      res.status(400).json({ error: "Missing saison parameter" });
      return;
    }
    // Verification unicité :
    const teamExist = await prisma.team.findFirst({
      where: {
        abr_equipe: abr_equipe,
        saison: saison,
      },
    });
    if (teamExist) {
      res.status(400).json({ error: "Team already exist" });
      return;
    }
    // Create
    await prisma.team.create({
      data: {
        abr_equipe,
        team_name,
        saison,
      },
    });
    res.status(201).json({ message: "Team created" });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error while creating team", message: error.message });
    return;
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { saison_param, abr_param } = req.params;

    // Verification Parametres
    if (saison_param && abr_param) {
      // Verification existe
      const teamExist = await prisma.team.findFirst({
        where: {
          abr_equipe: abr_param.toUpperCase(),
          saison: Number(saison_param),
        },
      });

      if (!teamExist) {
        res.status(400).json({ error: "Team not found" });
        return;
      }
    } else {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const { abr_equipe, team_name, saison } = req.body;

    // Verification Body
    if (!abr_equipe) {
      res.status(400).json({ error: "Missing abr_equipe parameter" });
      return;
    }
    if (!team_name) {
      res.status(400).json({ error: "Missing team_name parameter" });
      return;
    }
    if (!saison) {
      res.status(400).json({ error: "Missing saison parameter" });
      return;
    }

    // Verification unicité
    const teamUnique = await prisma.team.findFirst({
      where: {
        abr_equipe: abr_equipe.toUpperCase(),
        saison: Number(saison),
        NOT: {
          abr_equipe: abr_param.toUpperCase(),
          saison: Number(saison_param),
        },
      },
    });

    if (teamUnique) {
      res.status(400).json({ error: "Team already exist" });
      return;
    }

    // Update
    await prisma.team.update({
      where: {
        abr_equipe_saison: {
          abr_equipe: abr_param.toUpperCase(),
          saison: Number(saison_param),
        },
      },
      data: {
        abr_equipe: abr_equipe.toUpperCase(),
        team_name,
        saison,
      },
    });
    res.status(200).json({ message: "Team updated" });
  } catch (error: any) {
    res.status(500).json({ error: "Error while updating team" });
    return;
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { saison, abr } = req.params;
    if (!saison || !abr) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const teamExist = await prisma.team.findFirst({
      where: {
        abr_equipe: abr.toUpperCase(),
        saison: Number(saison),
      },
    });

    if (!teamExist) {
      res.status(400).json({ error: "Team not found" });
      return;
    }

    await prisma.team.delete({
      where: {
        abr_equipe_saison: {
          abr_equipe: abr.toUpperCase(),
          saison: Number(saison),
        },
      },
    });
    res.status(200).json({ message: "Team deleted" });
  } catch (error: any) {
    res.status(500).json({ error: "Error while deleting team" });
    return;
  }
};
