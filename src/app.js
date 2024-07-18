const express = require("express"); // Importamos Express
const animesRoutes = require("./routes/tasks"); // Importamos las rutas de la API
const studiosRoutes = require("./routes/studios"); 
const studiosRoutes = require("./routes/directors"); 

const errorHandler = require("./middlewares/errorHandler"); // Importamos el middleware para manejo de errores

const app = express(); // Instanciamos Express
const PORT = 3000; // Puerto del servidor en donde se ejecutará la API

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON. Tambien conocido como middleware de aplicación.
app.use("/animes", animesRoutes); // Middleware para manejar las rutas de la API. Tambien conocido como middleware de montaje o de enrutamiento.
app.use("/studios", studiosRoutes); 
app.use("/directors", studiosRoutes); 
app.use(errorHandler); // Middleware para manejar errores.

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

