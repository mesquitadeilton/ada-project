import express from "express";
import supabase from "../database.js";
import routes from "./routes/index.js";

const checkConnection = async () => {
    const { data, error } = await supabase.from('alunos').select('*');
    if (error) {
        console.error("ERRO: ", error);
    } else {
        console.log("Banco de dados: OK");
    }
};

checkConnection();

const app = express();
routes(app);

export default app;