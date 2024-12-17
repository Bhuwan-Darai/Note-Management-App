// src/middlewares/notFoundHandler.ts
import { Request, Response, NextFunction } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error: Error & { status?: number } = new Error("Not Found");
  error.status = 404;
  next(error);
};
export default notFoundHandler;
