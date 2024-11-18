import bcrypt from 'bcryptjs';

import dbConnection from "../config/database.js";
import Class from "../models/class.js"

class ClassController {
    static async addStudentToClass(req, res) {
        try {
            const { cod, email } = req.body;  // Pegando o 'cod' e 'email' do corpo da requisição
    
            // Verifica se foi passado o cod e email
            if (!cod || !email) {
                return res.status(400).json({ ERRO: "Faltando 'cod' ou 'email' na requisição." });
            }
    
            // Verifica se a turma existe
            const { data: classData, error: classError } = await dbConnection
                .from('class')
                .select('*')
                .eq('cod', cod);
    
            if (classError) {
                console.error("ERRO:", classError.message);
                return res.status(500).json({ ERRO: classError.message });
            }
    
            // Se a turma não for encontrada
            if (classData.length === 0) {
                return res.status(404).json({ message: "Turma não encontrada" });
            }
    
            // Adiciona o aluno à tabela 'student_classes'
            const { error: insertError } = await dbConnection
                .from('student_classes')
                .insert([{ cod, email }]);
    
            if (insertError) {
                console.error("ERRO ao adicionar aluno:", insertError.message);
                return res.status(500).json({ ERRO: insertError.message });
            }
    
            // Sucesso: Aluno adicionado
            res.status(200).json({ message: "Aluno adicionado" });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }
    
    static async createClass(req, res) {
        const { cod, professor, name, description } = req.body;

        try {
            const newClass = new Class({ cod, professor, name, description });

            const { data, error } = await dbConnection
                .from('class')
                .insert([ newClass ]);
    
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

    static async getClassesByStudent(req, res) {
        const { email } = req.body;
    
        try {
            // Primeiro, busque o código das classes associadas ao aluno
            const { data: studentClasses, error: studentClassesError } = await dbConnection
                .from('student_classes')
                .select('cod')
                .eq('email', email);
    
            if (studentClassesError) {
                console.error("ERRO:", studentClassesError.message);
                return res.status(400).json({ ERRO: studentClassesError.message });
            }
    
            // Agora, busque as turmas com base nos códigos encontrados
            const { data, error } = await dbConnection
                .from('class')
                .select('cod, name')
                .in('cod', studentClasses.map(sc => sc.cod)); // Filtra pelas turmas associadas
    
            if (error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });
            }
    
            res.status(200).json({ Turmas: data });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }
    
    static async getClassesByProfessor(req, res) {
        const { email } = req.body;

        try {
            const { data, error } = await dbConnection
                .from('class')
                .select('cod, name, description')
                .eq('professor', email);  // Filtra diretamente pelo 'email' na tabela 'class'

            if (error) {
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