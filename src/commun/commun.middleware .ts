import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as jwt.Secret
    ) as {
      id: string;
    };
    const userId = decodedToken.id;
    req.query = {
      userId: userId,
    };
    next();
  } else {
    res.status(403).json({ error: "Access denied. You must be logged in." });
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Number(req.query.userId) === 1) {
    next();
  } else {
    res.status(403).json({ error: "Access denied. You must be an admin." });
    return;
  }
};
