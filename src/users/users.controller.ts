import { Request, Response } from "express";
import prisma from "../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.status(200).send(users);
    }
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
    });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(users);
    }
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const createUser = async (
  req: Request<{}, {}, IUser, "email" | "password">,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      res.status(400).send("Email et mot de passe sont requis.");
      return;
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      res.status(400).send("Email déjà utilisé.");
      return;
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: cryptedPassword },
    });

    res.status(201).send("User créer.");
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Verification Existance User.
    const userIdExist = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!userIdExist) {
      res.status(400).send("L'user n'existe pas.");
      return;
    }
    // Fin Verification Existance user.

    const { email, password } = req.body;

    if (email) {
      const emailExist = await prisma.user.findFirst({
        where: {
          email: email,
          NOT: {
            id: Number(userId),
          },
        },
      });

      if (emailExist) {
        res.status(400).send("L'email est déjà prit.");
        return;
      }
    } else {
      res.status(400).send("L'email est manquant.");
      return;
    }

    if (!password) {
      res.status(400).send("Le mot de passe est manquant.");
      return;
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        email,
        password: cryptedPassword,
      },
    });

    res.status(200).send(`User mis à jour.`);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Verification Existance user.
    const userIdExist = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!userIdExist) {
      res.status(400).send("L'user n'existe pas.");
      return;
    }
    // Fin Verification Existance user.

    await prisma.user.delete({
      where: { id: Number(userId) },
    });

    res.status(200).send("User supprimé.");
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const login = async (
  req: Request<{}, {}, Pick<IUser, "email" | "password">>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      res.status(400).send("Email et mot de passe sont requis.");
      return;
    }

    // On recherche un user
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Verification existance d'un user
    if (!user) {
      res.status(404).send("Aucun utilisateur avec cette email.");
      return;
    }

    // Inserer ici la verification du mot de passe.
    const samePassword = await bcrypt.compare(password, user!.password);
    if (!samePassword) {
      res.status(400).send("Incorrect Password.");
      return;
    }

    // Génération du token JWT
    const token = jwt.sign(
      {
        id: user!.id,
        email: email,
      },
      process.env.JWT_SECRET as jwt.Secret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      } as jwt.SignOptions
    );

    // Réponse avec le token
    res.status(201).send({ token, userId: user.id });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
