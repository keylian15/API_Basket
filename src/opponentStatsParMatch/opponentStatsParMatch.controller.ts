import { Request, Response } from "express";
import prisma from "../client";

export const getOpponentsStatsParMatch = async (
  _req: Request,
  res: Response
) => {
  try {
    const OpponentsStatsParMatch =
      await prisma.opponent_stats_par_match.findMany();

    if (OpponentsStatsParMatch.length === 0) {
      res.status(404).json({ error: "No Opponents's stats par match found" });
      return;
    }
    res.status(200).json({ data: OpponentsStatsParMatch });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching opponents's stats par match" });
  }
};

export const getOpponentStatsParMatch = async (req: Request, res: Response) => {
  try {
    const { saison, abr, qualif } = req.params;
    if (!saison || !abr || !qualif) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const playerDirectory = await prisma.opponent_stats_par_match.findFirst({
      where: {
        saison: Number(saison),
        abr_equipe: abr.toUpperCase(),
        qualif: qualif === "true",
      },
    });

    if (!playerDirectory) {
      res.status(404).json({ error: "Opponent's stats par match not found" });
      return;
    }

    res.status(200).json({ data: playerDirectory });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching opponent's stats par match" });
  }
};

export const createOpponentStatsParMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      saison,
      abr_equipe,
      lg,
      team_name,
      qualif,
      partie_jouee,
      minute_par_match,
      opp_fg_par_match,
      opp_fga_par_match,
      opp_fg_pourcent,
      opp_x3p_par_match,
      opp_x3pa_par_match,
      opp_x3p_pourcent,
      opp_x2p_par_match,
      opp_x2pa_par_match,
      opp_x2p_pourcent,
      opp_ft_par_match,
      opp_fta_par_match,
      opp_ft_pourcent,
      opp_orb_par_match,
      opp_drb_par_match,
      opp_trb_par_match,
      opp_ast_par_match,
      opp_stl_par_match,
      opp_blk_par_match,
      opp_tov_par_match,
      opp_pf_par_match,
      opp_pts_par_match,
      opp_possession,
    } = req.body;

    // Verification des données
    if (!saison) {
      res.status(400).json({ error: "Missing saison" });
      return;
    }
    if (!abr_equipe) {
      res.status(400).json({ error: "Missing abr_equipe" });
      return;
    }

    if (qualif.length === 0) {
      res.status(400).json({ error: "Missing qualif" });
      return;
    }

    // Verification unicité
    const existingOpponentStatsParMatch =
      await prisma.opponent_stats_par_match.findFirst({
        where: {
          saison: Number(saison),
          abr_equipe: abr_equipe.toUpperCase(),
          qualif,
        },
      });

    if (existingOpponentStatsParMatch) {
      res
        .status(409)
        .json({ error: "Opponent's stats par match already exists" });
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
    await prisma.opponent_stats_par_match.create({
      data: {
        saison: Number(saison),
        abr_equipe: abr_equipe.toUpperCase(),
        lg,
        team_name,
        qualif,
        partie_jouee,
        minute_par_match,
        opp_fg_par_match,
        opp_fga_par_match,
        opp_fg_pourcent,
        opp_x3p_par_match,
        opp_x3pa_par_match,
        opp_x3p_pourcent,
        opp_x2p_par_match,
        opp_x2pa_par_match,
        opp_x2p_pourcent,
        opp_ft_par_match,
        opp_fta_par_match,
        opp_ft_pourcent,
        opp_orb_par_match,
        opp_drb_par_match,
        opp_trb_par_match,
        opp_ast_par_match,
        opp_stl_par_match,
        opp_blk_par_match,
        opp_tov_par_match,
        opp_pf_par_match,
        opp_pts_par_match,
        opp_possession,
      },
    });

    res.status(201).json({ message: "Opponent's stats par match created" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error while creating opponent's stats par match",
      message: error.message,
    });
  }
};

export const updateOpponentStatsParMatch = async (
  req: Request,
  res: Response
) => {
  try {
    // Verification parametre
    const { saison_param, abr_equipe_param, qualif_param } = req.params;
    if (!saison_param || !abr_equipe_param || qualif_param.length === 0) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    // verification existance
    const existOpponentStatsParMatch =
      await prisma.opponent_stats_par_match.findFirst({
        where: {
          saison: Number(saison_param),
          abr_equipe: abr_equipe_param.toUpperCase(),
          qualif: qualif_param === "true",
        },
      });

    if (!existOpponentStatsParMatch) {
      res.status(404).json({ error: "Opponent's stats par match not found" });
      return;
    }

    const {
      saison,
      abr_equipe,
      lg,
      team_name,
      qualif,
      partie_jouee,
      minute_par_match,
      opp_fg_par_match,
      opp_fga_par_match,
      opp_fg_pourcent,
      opp_x3p_par_match,
      opp_x3pa_par_match,
      opp_x3p_pourcent,
      opp_x2p_par_match,
      opp_x2pa_par_match,
      opp_x2p_pourcent,
      opp_ft_par_match,
      opp_fta_par_match,
      opp_ft_pourcent,
      opp_orb_par_match,
      opp_drb_par_match,
      opp_trb_par_match,
      opp_ast_par_match,
      opp_stl_par_match,
      opp_blk_par_match,
      opp_tov_par_match,
      opp_pf_par_match,
      opp_pts_par_match,
      opp_possession,
    } = req.body;

    // Verification des données
    if (!saison) {
      res.status(400).json({ error: "Missing saison" });
      return;
    }
    if (!abr_equipe) {
      res.status(400).json({ error: "Missing abr_equipe" });
      return;
    }
    if (qualif.length === 0) {
      res.status(400).json({ error: "Missing qualif" });
      return;
    }

    // Verification unicité
    const existingOpponentStatsParMatch =
      await prisma.opponent_stats_par_match.findFirst({
        where: {
          saison: Number(saison),
          abr_equipe: abr_equipe.toUpperCase(),
          qualif,
          NOT: {
            saison: Number(saison_param),
            abr_equipe: abr_equipe_param.toUpperCase(),
            qualif: qualif_param === "true",
          },
        },
      });

    if (existingOpponentStatsParMatch) {
      res
        .status(400)
        .json({ error: "Opponent's stats par match already exists" });
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

    // Update
    await prisma.opponent_stats_par_match.update({
      where: {
        abr_equipe_saison_qualif: {
          saison: Number(saison_param),
          abr_equipe: abr_equipe_param.toUpperCase(),
          qualif: qualif_param == "true",
        },
      },

      data: {
        saison: Number(saison),
        abr_equipe: abr_equipe.toUpperCase(),
        lg,
        team_name,
        qualif,
        partie_jouee,
        minute_par_match,
        opp_fg_par_match,
        opp_fga_par_match,
        opp_fg_pourcent,
        opp_x3p_par_match,
        opp_x3pa_par_match,
        opp_x3p_pourcent,
        opp_x2p_par_match,
        opp_x2pa_par_match,
        opp_x2p_pourcent,
        opp_ft_par_match,
        opp_fta_par_match,
        opp_ft_pourcent,
        opp_orb_par_match,
        opp_drb_par_match,
        opp_trb_par_match,
        opp_ast_par_match,
        opp_stl_par_match,
        opp_blk_par_match,
        opp_tov_par_match,
        opp_pf_par_match,
        opp_pts_par_match,
        opp_possession,
      },
    });

    res.status(201).json({ message: "Opponent's stats par match updated" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error while creating opponent's stats par match",
    });
  }
};

export const deleteOpponentStatsParMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const { saison_param, abr_equipe_param, qualif_param } = req.params;
    if (!saison_param || !abr_equipe_param || qualif_param.length === 0) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const existOpponentStatsParMatch =
      await prisma.opponent_stats_par_match.findFirst({
        where: {
          saison: Number(saison_param),
          abr_equipe: abr_equipe_param.toUpperCase(),
          qualif: qualif_param === "true",
        },
      });

    if (!existOpponentStatsParMatch) {
      res.status(404).json({ error: "Opponent's stats par match not found" });
      return;
    }

    await prisma.opponent_stats_par_match.delete({
      where: {
        abr_equipe_saison_qualif: {
          saison: Number(saison_param),
          abr_equipe: abr_equipe_param.toUpperCase(),
          qualif: qualif_param === "true",
        },
      },
    });
    res.status(200).json({ message: "Opponent's stats par match deleted" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error while deleting opponent's stats par match",
    });
  }
};
