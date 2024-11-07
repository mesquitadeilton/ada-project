import supabase from "../../database.js";

class StudentController {
    static async createStudent(req, res) {
        const { name, email, password} = req.body;
    
        try {
            const newStudent = { name, email, password};
    
            const { data, error } = await supabase
                .from('aluno')
                .insert([newStudent]);
    
            if(error) {
                console.error('ERRO:', error.message);
                return res.status(400).json({ error: 'ERRO: ' + error.message });
            }
    
            console.log('Usuário criado com sucesso:', data);
            res.status(201).json({ message: 'Usuário criado com sucesso', data });
    
            return data;
        } catch (error) {
            console.error('Erro ao criar usuário:', error.message);
            res.status(500).json({ error: 'Erro ao criar usuário' });
    
            return null;
        }
    }

    static async getStudents() {
        try {
            const { data, error } = await supabase
                .from('aluno')
                .select('*');
    
            if(error) {
                console.error('Erro ao buscar alunos:', error.message);
                return res.status(400).json({ error: 'Erro ao buscar alunos: ' + error.message });
            }
    
            console.log('Alunos encontrados:', data);
            res.status(200).json({ students: data });  // Retorna os alunos encontrados
    
        } catch (error) {
            console.error('Erro inesperado ao buscar alunos:', error.message);
            res.status(500).json({ error: 'Erro inesperado ao buscar alunos' });
        }
    }
}

export default StudentController;