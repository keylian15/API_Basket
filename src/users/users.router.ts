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
userRouter.post("/user", createUser);
userRouter.get("/user/:userId", getUser);
userRouter.patch("/user/:userId", verifyJWT, updateUser);
userRouter.delete("/user/:userId", verifyJWT, deleteUser);
userRouter.post("/user/login", login);
