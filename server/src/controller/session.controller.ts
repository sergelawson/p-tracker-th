import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
  // Validate Password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // create access jwt token

  const accesToken = signJwt(
    { ...user, session: session._id },
    "accessTokenKey",
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenKey",
    {
      expiresIn: config.get<string>("refreshTokenTtl"),
    }
  );

  // return access and refresh token
  return res.send({
    accesToken,
    refreshToken,
    email: user.email,
    name: user.name,
    role: user.role,
  });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
