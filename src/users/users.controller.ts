// Fichier utilisant la table users
import { Request, Response } from "express";
import prisma from "../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    if (users.length === 0) {
      res.status(404).json({ error: "No users found" });
    } else {
      res.status(200).json({ data: users });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    if (!id) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const users = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!users) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ data: users });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const userExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      res.status(400).json({ error: "Email already used" });
      return;
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: { email, password: cryptedPassword },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Verification Existance User.
    const userIdExist = await prisma.users.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!userIdExist) {
      res.status(400).json({ error: "The user does not exist" });
      return;
    }
    // Fin Verification Existance user.

    const { email, password } = req.body;

    if (email) {
      const emailExist = await prisma.users.findFirst({
        where: {
          email: email,
          NOT: {
            id: Number(userId),
          },
        },
      });

      if (emailExist) {
        res.status(400).json({ error: "The email is already taken" });
        return;
      }
    } else {
      res.status(400).json({ error: "Email is missing" });
      return;
    }

    if (!password) {
      res.status(400).json({ error: "The password is missing" });
      return;
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    await prisma.users.update({
      where: { id: Number(userId) },
      data: {
        email,
        password: cryptedPassword,
      },
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Verification Existance user.
    const userIdExist = await prisma.users.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!userIdExist) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    // Fin Verification Existance user.

    await prisma.users.delete({
      where: { id: Number(userId) },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // On recherche un user
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // Verification existance d'un user
    if (!user) {
      res.status(404).json({ error: "No user found with this email" });
      return;
    }

    // Inserer ici la verification du mot de passe.
    const samePassword = await bcrypt.compare(password, user!.password);
    if (!samePassword) {
      res.status(400).json({ error: "Incorrect password" });
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
    res.status(201).json({ data: { token, userId: user.id } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
