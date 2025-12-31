import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_WEB_TOKEN || "secret123";



export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
