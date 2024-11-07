import express from "express";
import dbConnection from "./config/database.js"
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("Servidor: OK");
})

app.use(express.json());
routes(app);