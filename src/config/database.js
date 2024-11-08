import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const dbConnection = createClient(supabaseUrl, supabaseKey);

const checkConnection = async () => {
    const { data, error } = await dbConnection
        .from('aluno')
        .select('*')
        .limit(1);
        
    if(error) {
        console.error("ERRO: ", error);
    } else {
        console.log("Banco de dados: OK");
    }
};

checkConnection();

export default dbConnection;