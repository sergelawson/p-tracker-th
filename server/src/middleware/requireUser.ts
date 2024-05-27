import { Request, Response, NextFunction } from "express";

export default function (role?: "tracker" | "driver" | "admin") {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = res.locals?.user;

    if (!user) {
      return res.sendStatus(401);
    }

    if (role && user.role !== role) {
      return res.sendStatus(401);
    }
    next();
  };
}
