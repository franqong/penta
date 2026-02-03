import express from "express"; //framework a usar para crear servidores y rutas
import cors from "cors"; //permite la comunicacion entre el front y el back

//imports de las rutas, activas y en desarrollo
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import albumsRoutes from "./routes/albums.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import communitiesRoutes from "./routes/communities.routes.js";
import postsRoutes from "./routes/posts.routes.js";

//import de middlewares
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express(); //app define rutas, configura middlewares y maneja requests y responses

app.use(cors()); //middleware global (habilita requests desde otros origenes)
app.use(express.json()); //le dice a express que al llegar una request con JSON, se lo pase automáticamente

app.get("/api/health", (req, res) => { //define una ruta con metodo GET y endpoint /api/health
  res.json({ status: "ok" });  //devuelve una respuesta JSON al cliente
});

//rutas de la API, activas y en desarrollo
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/communities", communitiesRoutes);
app.use("/api/posts", postsRoutes);


//definicion de middlewares
app.use(errorMiddleware);

export default app;
