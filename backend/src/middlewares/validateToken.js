import jwt from "jsonwebtoken";

const parseCookies = (cookieHeader) => {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const index = c.indexOf("=");
      const name = c.slice(0, index).trim();
      const value = c.slice(index + 1).trim();
      return [name, decodeURIComponent(value)];
    })
  );
};

export const authRequired = (req, res, next) => {
  try {
    // Try Authorization header first (Bearer token)
    const authHeader = req.headers?.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // Fallback to cookie parsing if present
    if (!token && req.headers?.cookie) {
      const cookies = parseCookies(req.headers.cookie);
      token = cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: no token provided" });
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    // Attach user payload to request for downstream handlers
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};
