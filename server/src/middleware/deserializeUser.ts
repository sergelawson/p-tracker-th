import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../service/session.service";

export default async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  let refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, "accessTokenKey");

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    if (Array.isArray(refreshToken)) {
      refreshToken = refreshToken[0];
    }

    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = verifyJwt(newAccessToken, "accessTokenKey");

      console.log("decoded", decoded);

      res.locals.user = decoded;

      return next();
    }
  }
  return next();
}
