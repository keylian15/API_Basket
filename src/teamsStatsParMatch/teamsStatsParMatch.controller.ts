import { Request, Response } from "express";
import prisma from "../client";

export const getTeamsStatsParMatch = async (_req: Request, res: Response) => {
  try {
    const teams = await prisma.team_stats_par_match.findMany();

    if (teams.length === 0) {
      res.status(404).json({ error: "No teams stat found" });
      return;
    }
    res.status(200).json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching teams stat" });
  }
};

export const getTeamStatsParMatch = async (req: Request, res: Response) => {
  try {
    const { saison, abr } = req.params;
    if (!saison || !abr) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    const team = await prisma.team_stats_par_match.findFirst({
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

export const createTeamStatsParMatch = async (req: Request, res: Response) => {
  try {
    const {
      saison,
      abr_equipe,
      lg,
      qualif,
      partie_jouee,
      minute_par_match,
      fg_par_match,
      fga_par_match,
      fg_pourcent,
      x3p_par_match,
      x3pa_par_match,
      x3p_pourcent,
      x2p_par_match,
      x2pa_par_match,
      x2p_pourcent,
      ft_par_match,
      fta_par_match,
      ft_pourcent,
      orb_par_match,
      drb_par_match,
      trb_par_match,
      ast_par_match,
      stl_par_match,
      blk_par_match,
      tov_par_match,
      pf_par_match,
      pts_par_match,
      possession,
    } = req.body;

    // Verification des données
    if (!saison) {
      res.status(400).json({ error: "Saison required" });
      return;
    }
    if (!abr_equipe) {
      res.status(400).json({ error: "Abr_equipe required" });
      return;
    }

    // Verification unicité
    const existingTeamStatsParMatch =
      await prisma.team_stats_par_match.findFirst({
        where: {
          abr_equipe: abr_equipe.toUpperCase(),
          saison: Number(saison),
        },
      });

    if (existingTeamStatsParMatch) {
      res.status(400).json({ error: "Team stats par match already exists" });
      return;
    }

    // Verification existance team
    const existingTeam = await prisma.team.findFirst({
      where: {
        abr_equipe: abr_equipe.toUpperCase(),
        saison,
      },
    });

    if (!existingTeam) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    // Création
    await prisma.team_stats_par_match.create({
      data: {
        saison: Number(saison),
        abr_equipe: abr_equipe.toUpperCase(),
        lg,
        qualif,
        partie_jouee,
        minute_par_match,
        fg_par_match,
        fga_par_match,
        fg_pourcent,
        x3p_par_match,
        x3pa_par_match,
        x3p_pourcent,
        x2p_par_match,
        x2pa_par_match,
        x2p_pourcent,
        ft_par_match,
        fta_par_match,
        ft_pourcent,
        orb_par_match,
        drb_par_match,
        trb_par_match,
        ast_par_match,
        stl_par_match,
        blk_par_match,
        tov_par_match,
        pf_par_match,
        pts_par_match,
        possession,
      },
    });

    res.status(201).json({ message: "Team stats par match created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeamStatsParMatch = async (req: Request, res: Response) => {
  try {
    // Verification des parametres
    const { saison_param, abr_equipe_param } = req.params;
    if (!saison_param || !abr_equipe_param) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    // Verification existance
    const existingTeamStatsParMatch =
      await prisma.team_stats_par_match.findFirst({
        where: {
          abr_equipe: abr_equipe_param.toUpperCase(),
          saison: Number(saison_param),
        },
      });

    if (!existingTeamStatsParMatch) {
      res.status(404).json({ error: "Team stats par match not found" });
      return;
    }

    // Verification body
    const {
      saison,
      abr_equipe,
      lg,
      qualif,
      partie_jouee,
      minute_par_match,
      fg_par_match,
      fga_par_match,
      fg_pourcent,
      x3p_par_match,
      x3pa_par_match,
      x3p_pourcent,
      x2p_par_match,
      x2pa_par_match,
      x2p_pourcent,
      ft_par_match,
      fta_par_match,
      ft_pourcent,
      orb_par_match,
      drb_par_match,
      trb_par_match,
      ast_par_match,
      stl_par_match,
      blk_par_match,
      tov_par_match,
      pf_par_match,
      pts_par_match,
      possession,
    } = req.body;

    if (!saison) {
      res.status(400).json({ error: "Saison required" });
      return;
    }
    if (!abr_equipe) {
      res.status(400).json({ error: "Abr_equipe required" });
      return;
    }

    // Verification unicité
    const uniqueTeamStatsParMatch = await prisma.team_stats_par_match.findFirst(
      {
        where: {
          abr_equipe: abr_equipe.toUpperCase(),
          saison: Number(saison),
          NOT: {
            abr_equipe: abr_equipe_param.toUpperCase(),
            saison: Number(saison_param),
          },
        },
      }
    );

    if (uniqueTeamStatsParMatch) {
      res.status(400).json({ error: "Team stats par match already exists" });
      return;
    }

    // Verification existance team
    const existingTeam = await prisma.team.findFirst({
      where: {
        abr_equipe: abr_equipe.toUpperCase(),
        saison,
      },
    });

    if (!existingTeam) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    // Mise à jour
    await prisma.team_stats_par_match.update({
      where: {
        abr_equipe_saison: {
          abr_equipe: abr_equipe_param.toUpperCase(),
          saison: Number(saison_param),
        },
      },
      data: {
        saison: Number(saison),
        abr_equipe: abr_equipe.toUpperCase(),
        lg,
        qualif,
        partie_jouee,
        minute_par_match,
        fg_par_match,
        fga_par_match,
        fg_pourcent,
        x3p_par_match,
        x3pa_par_match,
        x3p_pourcent,
        x2p_par_match,
        x2pa_par_match,
        x2p_pourcent,
        ft_par_match,
        fta_par_match,
        ft_pourcent,
        orb_par_match,
        drb_par_match,
        trb_par_match,
        ast_par_match,
        stl_par_match,
        blk_par_match,
        tov_par_match,
        pf_par_match,
        pts_par_match,
        possession,
      },
    });

    res.status(200).json({ message: "Team stats par match updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeamStatsParMatch = async (req: Request, res: Response) => {
  // Verification parametere
  try {
    const { saison_param, abr_equipe_param } = req.params;
    if (!saison_param || !abr_equipe_param) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }
    // Verification existance
    const existingTeamStatsParMatch =
      await prisma.team_stats_par_match.findFirst({
        where: {
          abr_equipe: abr_equipe_param.toUpperCase(),
          saison: Number(saison_param),
        },
      });

    if (!existingTeamStatsParMatch) {
      res.status(404).json({ error: "Team stats par match not found" });
      return;
    }

    // Delete
    await prisma.team_stats_par_match.delete({
      where: {
        abr_equipe_saison: {
          abr_equipe: abr_equipe_param.toUpperCase(),
          saison: Number(saison_param),
        },
      },
    });

    res.status(200).json({ message: "Team stats par match deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
