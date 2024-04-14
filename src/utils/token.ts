import jwt from "jsonwebtoken";
import { config } from "../";
import { UserDecoded } from "../middlewares/current-user";

export class Token {
  static signJWT(userId: string, userEmail: string): string {
    const signed = jwt.sign(
      { id: userId, email: userEmail },
      config.jwtSecret
    );
    return signed;
  }

  static verifyJWT(token: string): UserDecoded {
    const verify = jwt.verify(token, config.jwtSecret);
    // @ts-expect-error
    return verify;
  }
}