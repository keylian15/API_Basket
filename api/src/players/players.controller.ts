import { Request, Response } from "express";
import prisma from "../client";

export const getPlayers = async (_req: Request, res: Response) => {
  try {
    const players = await prisma.players.findMany();
    if (!players || players.length === 0) {
      res.status(404).send("No players found");
      return;
    }
    res.status(200).send(players);
  } catch (error) {
    res.status(500).send("Error while fetching players");
  }
};

export const getPlayer = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const player = await prisma.players.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!player) {
      res.status(404).send("Player not found");
      return;
    }
    res.status(200).send(player);
  } catch (error) {
    res.status(500).send("Error while fetching player");
  }
};
