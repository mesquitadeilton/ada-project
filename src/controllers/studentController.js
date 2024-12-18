import bcrypt from 'bcryptjs';

import dbConnection from "../config/database.js";
import User from "../models/user.js"

class StudentController {
    static async createStudent(req, res) {
        const { name, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const student = new User({ name, email });
            student.password = hashedPassword;

            const { authData, error } = await dbConnection
                .from('auth')
                .insert([{ email: student.email, password: student.password }]);
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }

            const { userData, userError } = await dbConnection
                .from('student')
                .insert([{ name: student.name, email: student.email }]);
    
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

    static async getStudents(req, res) {
        try {
            const { data, error } = await dbConnection
                .from('student')
                .select('*');
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });
            }
    
            res.status(200).json({ Alunos: data });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }

    static async updateStudent(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const student = new User();
            if (name) student.name = name;
            if (email) student.email = email;
            if (password) student.password = password;

            const { data, error } = await dbConnection
                .from('student')
                .update(student)
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

    static async deleteStudent(req, res) {
        const { id } = req.params;
        
        try {
            const { data, error } = await dbConnection
                .from('student')
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