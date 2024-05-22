import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenKey" | "refreshTokenKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = config.get<string>(keyName);

  return jwt.sign(object, signingKey, {
    ...(options && options),
  });
}

export function verifyJwt(
  token: string,
  keyName: "accessTokenKey" | "refreshTokenKey"
) {
  const signingKey = config.get<string>(keyName);

  try {
    const decoded = jwt.verify(token, signingKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
