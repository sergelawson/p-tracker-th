import SessionModel, { SessionDocument } from "../models/session.model";
import { findUser } from "./user.service";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import { verifyJwt, signJwt } from "../utils/jwt";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenKey");

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenKey",
    { expiresIn: config.get("accessTokenTtl") }
  );

  return accessToken;
}
