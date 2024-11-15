import bcrypt from 'bcryptjs';

import dbConnection from "../config/database.js";
import Class from "../models/class.js"

class ClassController {
    static async createClass(req, res) {
        const { cod, professor, email, description } = req.body;

        try {
            const newClass = new Class({ cod, professor, email, description });

            const { data, error } = await dbConnection
                .from('class')
                .insert([{ newClass }]);
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }
    
            res.status(200).json({ message: "Turma criada com sucesso" });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }

    static async getClasses(req, res) {
        try {
            const { data, error } = await dbConnection
                .from('class')
                .select('*');
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });
            }
    
            res.status(200).json({ Turmas: data });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }
}

export default ClassController;