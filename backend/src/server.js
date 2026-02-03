import "dotenv/config";
import app from "./app.js"; //se trae la app creada

const PORT = process.env.PORT || 3000; //define el puerto: si existe PORT en el .env, lo usa; si no usa 3000

app.listen(PORT, () => { //arranca el servidor en ese puerto
  console.log(`Backend corriendo en puerto ${PORT}`);
});
