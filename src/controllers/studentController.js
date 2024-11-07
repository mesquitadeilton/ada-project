import dbConnection from "../config/database.js";

class StudentController {
    static async createStudent(req, res) {
        const { name, email, password } = req.body;

        try {
            const { data, error } = await dbConnection
                .from('alunos')
                .insert([{ name, email, password }]);
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }
    
            res.status(200).json({ message: "Aluno criado com sucesso" });
        } catch (error) {
            console.error("ERRO", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }

    static async getStudents(req, res) {
        try {
            const { data, error } = await dbConnection
                .from('alunos')
                .select('*');
    
            if(error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });;
            }
    
            res.status(200).json({ Alunos: data });
        } catch (error) {
            console.error("ERRO", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }

    static async updateStudent(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const updatedStudent = {};
            if (name) updatedStudent.name = name;
            if (email) updatedStudent.email = email;
            if (password) updatedStudent.password = password;

            const { data, error } = await dbConnection
                .from('alunos')
                .update(updatedStudent)
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
                .from('alunos')
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