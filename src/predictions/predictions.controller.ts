// Fihchier utilisant la table
import { Request, Response } from "express";
import prisma from "../client";

// Type explicite pour les clés de l'objet averages
type StatKeys =
  | "minute_par_match"
  | "fg_par_match"
  | "fga_par_match"
  | "fg_pourcent"
  | "x3p_par_match"
  | "x3pa_par_match"
  | "x3p_pourcent"
  | "x2p_par_match"
  | "x2pa_par_match"
  | "x2p_pourcent"
  | "ft_par_match"
  | "fta_par_match"
  | "ft_pourcent"
  | "orb_par_match"
  | "drb_par_match"
  | "trb_par_match"
  | "ast_par_match"
  | "stl_par_match"
  | "blk_par_match"
  | "tov_par_match"
  | "pf_par_match"
  | "pts_par_match"
  | "possession";

// Fonction pour calculer la moyenne des stats
const calculateAverages = (teamStats: any[]) => {
  // Initialisation d'un objet pour stocker les moyennes
  const averages: { [key in StatKeys]: number } = {
    minute_par_match: 0,
    fg_par_match: 0,
    fga_par_match: 0,
    fg_pourcent: 0,
    x3p_par_match: 0,
    x3pa_par_match: 0,
    x3p_pourcent: 0,
    x2p_par_match: 0,
    x2pa_par_match: 0,
    x2p_pourcent: 0,
    ft_par_match: 0,
    fta_par_match: 0,
    ft_pourcent: 0,
    orb_par_match: 0,
    drb_par_match: 0,
    trb_par_match: 0,
    ast_par_match: 0,
    stl_par_match: 0,
    blk_par_match: 0,
    tov_par_match: 0,
    pf_par_match: 0,
    pts_par_match: 0,
    possession: 0,
  };

  // Calcul de la somme de chaque stat pour les 3 saisons
  teamStats.forEach((stat) => {
    averages.minute_par_match += stat.minute_par_match;
    averages.fg_par_match += stat.fg_par_match;
    averages.fga_par_match += stat.fga_par_match;
    averages.fg_pourcent += stat.fg_pourcent;
    averages.x3p_par_match += stat.x3p_par_match;
    averages.x3pa_par_match += stat.x3pa_par_match;
    averages.x3p_pourcent += stat.x3p_pourcent;
    averages.x2p_par_match += stat.x2p_par_match;
    averages.x2pa_par_match += stat.x2pa_par_match;
    averages.x2p_pourcent += stat.x2p_pourcent;
    averages.ft_par_match += stat.ft_par_match;
    averages.fta_par_match += stat.fta_par_match;
    averages.ft_pourcent += stat.ft_pourcent;
    averages.orb_par_match += stat.orb_par_match;
    averages.drb_par_match += stat.drb_par_match;
    averages.trb_par_match += stat.trb_par_match;
    averages.ast_par_match += stat.ast_par_match;
    averages.stl_par_match += stat.stl_par_match;
    averages.blk_par_match += stat.blk_par_match;
    averages.tov_par_match += stat.tov_par_match;
    averages.pf_par_match += stat.pf_par_match;
    averages.pts_par_match += stat.pts_par_match;
    averages.possession += stat.possession;
  });

  // Calcul des moyennes en divisant chaque somme par le nombre de saisons (3)
  const numberOfSeasons = teamStats.length;
  (Object.keys(averages) as StatKeys[]).forEach((key) => {
    averages[key] = averages[key] / numberOfSeasons;
  });

  return averages;
};

const calculateWinner = (
  t1: Record<StatKeys, number>,
  t2: Record<StatKeys, number>
) => {
  const fields: StatKeys[] = [
    "minute_par_match",
    "fg_par_match",
    "fga_par_match",
    "fg_pourcent",
    "x3p_par_match",
    "x3pa_par_match",
    "x3p_pourcent",
    "x2p_par_match",
    "x2pa_par_match",
    "x2p_pourcent",
    "ft_par_match",
    "fta_par_match",
    "ft_pourcent",
    "orb_par_match",
    "drb_par_match",
    "trb_par_match",
    "ast_par_match",
    "stl_par_match",
    "blk_par_match",
    "tov_par_match",
    "pf_par_match",
    "pts_par_match",
    "possession",
  ];

  let scoreT1 = 0;
  let scoreT2 = 0;

  fields.forEach((key) => {
    // Pour turnovers et fautes, moins c'est mieux
    if (["tov_par_match", "pf_par_match"].includes(key)) {
      if (t1[key] < t2[key]) scoreT1++;
      else if (t2[key] < t1[key]) scoreT2++;
    } else {
      if (t1[key] > t2[key]) scoreT1++;
      else if (t2[key] > t1[key]) scoreT2++;
    }
  });

  const total = scoreT1 + scoreT2;
  let winner = "";
  let percent = 0;

  if (scoreT1 > scoreT2) {
    winner = "abr_home";
    percent = Math.round((scoreT1 / total) * 100);
  } else if (scoreT2 > scoreT1) {
    winner = "abr_away";
    percent = Math.round((scoreT2 / total) * 100);
  } else {
    winner = "draw";
    percent = 50;
  }

  return { winner, percent };
};

function simulateMatchStats(
  avgT1: Record<StatKeys, number>,
  percentT1: number,
  avgT2: Record<StatKeys, number>,
  percentT2: number
): Record<StatKeys, number> {
  const simulatedStats = {} as Record<StatKeys, number>;

  (Object.keys(avgT1) as StatKeys[]).forEach((key) => {
    simulatedStats[key] = avgT1[key] * percentT1 + avgT2[key] * percentT2;
  });

  return simulatedStats;
}

// Fonction de comparaison avec calcul des moyennes
export const predictionTeam = async (req: Request, res: Response) => {
  try {
    const { abr_home, abr_away } = req.params;
    if (!abr_home || !abr_away) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const currentSeason = new Date().getFullYear();

    // Récupérer les statistiques de chaque équipe pour les 3 dernières saisons
    const teamStatsParMatch1 = await prisma.team_stats_par_match.findMany({
      where: {
        abr_equipe: abr_home.toUpperCase(),
        saison: { in: [currentSeason, currentSeason - 1, currentSeason - 2] },
      },
    });

    const teamStatsParMatch2 = await prisma.team_stats_par_match.findMany({
      where: {
        abr_equipe: abr_away.toUpperCase(),
        saison: { in: [currentSeason, currentSeason - 1, currentSeason - 2] },
      },
    });

    // Calculer les moyennes pour chaque équipe
    const averagesT1 = calculateAverages(teamStatsParMatch1);
    const averagesT2 = calculateAverages(teamStatsParMatch2);

    // Calcul du gagnant
    const prediction = calculateWinner(averagesT1, averagesT2);

    var percentT1 = 0;
    var percentT2 = 0;
    if (prediction["winner"] == "abr_home") {
      percentT1 = prediction["percent"];
      percentT2 = 100 - percentT1;
    } else {
      percentT2 = prediction["percent"];
      percentT1 = 100 - percentT2;
    }

    console.log(percentT1, percentT2);

    const matchPrediction = simulateMatchStats(
      averagesT1,
      percentT1 / 100,
      averagesT2,
      percentT2 / 100
    );

    // Retourner les moyennes dans la réponse
    res.status(200).json({
      prediction,
      matchPrediction,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
