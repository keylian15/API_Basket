import { Request, Response } from "express";
import prisma from "../client";

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await prisma.teams.findMany();

    const teamsWithStringIds = teams.map((team) => ({
      ...team,
      id: team.id.toString(),
    }));

    if (teamsWithStringIds.length === 0) {
      res.status(404).send("No teams found");
      return;
    }
    res.status(200).json(teamsWithStringIds);
  } catch (error) {
    res.status(500).send("Error while fetching teams");
  }
};

export const getTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const team = await prisma.teams.findUnique({
      where: {
        id: BigInt(id),
      },
    });

    if (!team) {
      res.status(404).send("Team not found");
      return;
    }

    const teamWithStringId = { ...team, id: team.id.toString() };

    res.status(200).json(teamWithStringId);
  } catch (error) {
    res.status(500).send("Error while fetching team");
  }
};
