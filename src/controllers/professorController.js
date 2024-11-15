import bcrypt from 'bcryptjs';

import dbConnection from "../config/database.js";
import User from "../models/user.js"

class StudentController {
    static async createProfessor(req, res) {
        const { name, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const professor = new User({ name, email });
            professor.password = hashedPassword;

            const { authData, error } = await dbConnection
                .from('auth')
                .insert([{ email: professor.email, password: professor.password }]);
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }

            const { userData, userError } = await dbConnection
                .from('professor')
                .insert([{ name: professor.name, email: professor.email }]);
    
            if(userError) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }
    
            res.status(200).json({ message: "Aluno criado com sucesso" });
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

    static async updateProfessor(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const professor = new User();
            if (name) professor.name = name;
            if (email) professor.email = email;
            if (password) professor.password = password;

            const { data, error } = await dbConnection
                .from('professor')
                .update(professor)
                .eq('id', id);

            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });
            }

            return res.status(200).json({ message: "Aluno atualizado com sucesso" });
        } catch (error) {
            console.error("ERRO:", error.message);
            return res.status(500).json({ ERRO: error.message });
        }
    }

    static async deleteProfessor(req, res) {
        const { id } = req.params;
        
        try {
            const { data, error } = await dbConnection
                .from('professor')
                .delete()
                .eq('id', id);
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }
    
            res.status(200).json({ message: "Aluno apagado com sucesso" });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }
}

export default StudentController;