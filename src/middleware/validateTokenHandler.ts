import { Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token: string = "";
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (
      authHeader &&
      typeof authHeader === "string" &&
      authHeader.startsWith("Bearer")
    ) {
      token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECERT ?? "",
        (err, decoded: any) => {
          if (err) {
            res.status(403);
            throw new Error("User is not authorized");
          }
          req.user = decoded.user;
          next();
        }
      );

      if (!token) {
        res.status(401);
        throw new Error(
          "User is not authorized or token is missing in request"
        );
      }
    } else {
      res.status(401);
      throw new Error("Token is missing in request");
    }
  }
);

export default validateToken;
