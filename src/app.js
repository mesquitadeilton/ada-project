import express from "express";
import dbConnection from "./config/database.js"
import routes from "./routes/index.js";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Servidor: OK");
})

routes(app);