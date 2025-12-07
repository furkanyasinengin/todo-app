import jwt, { JwtPayload } from "jsonwebtoken";

const DEFAULT_SIGN_OPTION: jwt.SignOptions = {
  expiresIn: "1d",
};

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: jwt.SignOptions = DEFAULT_SIGN_OPTION
) => {
  const secret_key = process.env.JWT_SECRET;

  if (!secret_key) {
    throw new Error("Can not read JWT secret key.");
  }

  return jwt.sign(payload, secret_key, options);
};

export const verifyJwt = (token: string) => {
  try {
    const secret_key = process.env.JWT_SECRET;

    if (!secret_key) {
      throw new Error("Can not read JWT secret key.");
    }

    const decoded = jwt.verify(token, secret_key);
    return decoded as JwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
