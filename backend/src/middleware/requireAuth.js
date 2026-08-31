import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  // Step 1: Get the Authorization header
  const { authorization } = req.headers;

  // Step 2: If there's no Authorization header, reject immediately
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Step 3: Split "Bearer <token>" to get just the token string
  // Hint: authorization starts with "Bearer ", so split by space and take index 1
  const token = authorization.split(" ")[1];

  try {
    // Step 4: Verify the token with jwt.verify
    // jwt.verify returns the decoded payload: { _id: ..., iat: ..., exp: ... }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Step 5: Attach the user _id to the request object so controllers can access it
    req.userId = decoded._id;

    // Step 6: Move on to the actual route handler
    next();
  
  } catch (error) {
    // Token is invalid, expired, or tampered with
    res.status(401).json({ error: "Request is not authorized" });
  }
};