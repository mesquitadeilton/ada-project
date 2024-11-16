import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dbConnection from "../config/database.js";

class LoginController {
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const { data, error } = await dbConnection
                .from('auth')
                .select('*')
                .eq('email', email);

            if (error) {
                console.error("ERRO:", error.message);
                return res.status(400).json({ ERRO: error.message });
            }

            if (data.length === 0) {
                return res.status(401).json({ ERRO: 'Credenciais inválidas' });
            }

            const user = data[0];

            // Comparando a senha fornecida com a senha armazenada (criptografada)
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ ERRO: 'Credenciais inválidas' });
            }

            // Buscando o nome do usuário nas tabelas 'student' ou 'professor'
            let userName = '';
            let userType = ''; // Novo campo para o tipo de usuário

            const studentResult = await dbConnection
                .from('student')
                .select('name')
                .eq('email', email);

            const professorResult = await dbConnection
                .from('professor')
                .select('name')
                .eq('email', email);

            // Verificando qual tabela tem o nome e definindo o tipo de usuário
            if (studentResult.data.length > 0) {
                userName = studentResult.data[0].name;
                userType = 'student'; // Tipo de usuário "student"
            } else if (professorResult.data.length > 0) {
                userName = professorResult.data[0].name;
                userType = 'professor'; // Tipo de usuário "professor"
            }

            // Gerando o token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET_KEY, // A chave secreta para o JWT
                { expiresIn: '1h' } // O token expira em 1 hora
            );

            res.status(200).json({
                message: 'Login bem-sucedido',
                token: token,
                email: user.email,
                name: userName, // Incluindo o nome na resposta
                type: userType // Incluindo o tipo de usuário na resposta
            });
        } catch (error) {
            console.error("ERRO:", error.message);
            res.status(500).json({ ERRO: error.message });
        }
    }
}

export default LoginController;
