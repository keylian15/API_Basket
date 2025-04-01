import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getUser,
  login,
  updateUser,
} from "./users.controller";
import { verifyJWT } from "../commun/commun.midleware";

export const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.post("/users", createUser);
userRouter.get("/users/:userId", getUser);
userRouter.patch("/users/:userId", verifyJWT, updateUser);
userRouter.delete("/users/:userId", verifyJWT, deleteUser);
userRouter.post("/users/login", login);
