import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getUser,
  login,
  updateUser,
} from "./users.controller";
import { verifyAdmin, verifyJWT } from "../commun/commun.middleware ";

export const userRouter = Router();

userRouter.get("/users", verifyJWT, getUsers);
userRouter.get("/user/:userId", verifyJWT, getUser);
userRouter.post("/user", verifyJWT, verifyAdmin, createUser);
userRouter.patch("/user/:userId", verifyJWT, verifyAdmin, updateUser);
userRouter.delete("/user/:userId", verifyJWT, verifyAdmin, deleteUser);
userRouter.post("/user/login", login);
