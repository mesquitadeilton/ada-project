import bcrypt from 'bcryptjs';

import dbConnection from "../config/database.js";
import User from "../models/user.js"

class ProfessorController {
    static async createProfessor(req, res) {
        const { name, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const professor = new User({ name, email });
            professor.password = hashedPassword;

            const { data, error } = await dbConnection
                .from('credenciais')
                .select('*')
                .eq('email', professor.email);
    
            if(data) {
                console.error("Usuário já cadastrado");
                return res.status(400).json({ message: "Usuário encontrado" });
            }

            const { userData, userError } = await dbConnection
                .from('professor')
                .insert([{ name: professor.name, email: professor.email }]);
    
            if(userError) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }

            const { authData, authError } = await dbConnection
                .from('credenciais')
                .insert([{ email: professor.email, password: professor.password }]);
    
            if(authError) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }
    
            res.status(200).json({ message: "Professor criado com sucesso" });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }

    static async getProfessors(req, res) {
        try {
            const { data, error } = await dbConnection
                .from('professor')
                .select('*');
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });
            }
    
            res.status(200).json({ Professores: data });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }
}

export default ProfessorController;