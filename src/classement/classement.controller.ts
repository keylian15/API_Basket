// Fichier utilisant les tables classement
import { Request, Response } from "express";
import prisma from "../client";

export const getClsJsContre = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_contres.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsContre = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_contres.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsFg = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_fg.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsFg = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_fg.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsFt = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_ft.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsFt = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_ft.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsInterception = async (_req: Request, res: Response) => {
  try {
    const classements =
      await prisma.classement_joueurs_interceptions.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsInterception = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_interceptions.findUnique(
      {
        where: {
          id_joueur_saison: {
            id_joueur: Number(id_joueur),
            saison: Number(saison),
          },
        },
      }
    );
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsMinute = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_minutes.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsMinute = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_minutes.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsPasse = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_passes.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsPasse = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_passes.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsPt = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_points.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsPt = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_points.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsRebond = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_rebonds.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsRebond = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_rebonds.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJsTir = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_tir.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJsTir = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_tir.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsJs3Pt = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.classement_joueurs_trois_pts.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClJs3Pt = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { id_joueur, saison } = req.params;
    if (!id_joueur || !saison) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_joueurs_trois_pts.findUnique({
      where: {
        id_joueur_saison: {
          id_joueur: Number(id_joueur),
          saison: Number(saison),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClsTmPt = async (_req: Request, res: Response) => {
  try {
    const classements = await prisma.team_stats_par_match.findMany();
    if (classements.length === 0) {
      res.status(404).json({ error: "No classements found" });
    } else {
      res.status(200).json({ data: classements });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClTmPt = async (req: Request, res: Response) => {
  try {
    // Verification param
    const { saison, abr_equipe } = req.params;
    if (!saison || !abr_equipe) {
      res.status(400).json({ error: "Missing parameter" });
      return;
    }

    const classement = await prisma.classement_team_pts.findUnique({
      where: {
        saison_abr_equipe: {
          saison: Number(saison),
          abr_equipe: abr_equipe.toUpperCase(),
        },
      },
    });
    if (!classement) {
      res.status(404).json({ error: "Classement not found" });
    } else {
      res.status(200).json({ data: classement });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
