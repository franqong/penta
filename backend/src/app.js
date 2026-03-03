import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import albumsRoutes from "./routes/albums.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import communitiesRoutes from "./routes/communities.routes.js";
import postsRoutes from "./routes/posts.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/communities", communitiesRoutes);
app.use("/api/posts", postsRoutes);

app.use(errorMiddleware);

export default app;
