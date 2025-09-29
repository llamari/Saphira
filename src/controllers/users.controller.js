import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import "dotenv/config"

export const GetUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar dados dos tutores' });
    }
};

export const GetUsersId = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Usuario.findOne({where: {id: userId}});
        if (!user) {
            return res.status(404).json({ erro: "Tutor não encontrado." })
        }
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar dados do tutor' });
    }
};

export const PostUsers = async (req, res) => {
    try {
        const { nome_completo, email, senha, cidade, estado, idade, telefone, celular, cpf, endereco, bairro, cep, instagram, facebook, administrador } = req.body;
        if (!nome_completo || !email || !senha || !cidade || !estado || !idade || !telefone ) {
            return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
        }

        const registeredUser = await Usuario.findOne({where: { email } });
        if (registeredUser) {
            return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await Usuario.create({ nome_completo, email, senha: hashedPassword, cidade, estado, idade, telefone, celular, cpf, endereco, bairro, cep, instagram, facebook, administrador });
        res.status(201).json(newUser);
    } 
    catch (error) {
        console.log('Erro', error);
        return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
    }
};

export const PatchUsersId = async (req, res) => {
    try {
        const { id } = req.params;
        const dataPatch = req.body;

        if (!dataPatch || Object.keys(dataPatch).length === 0) {
            return res.status(400).json({ erro: "Pelo menos um campo deve ser enviado para atualização." });
        }

        const [userUpdated] = await Usuario.update(dataPatch, { where: { id }});
        if (userUpdated === 0){
            return res.status(404).json({ erro: "Tutor não encontrado." })
        }

        const user = await Usuario.findByPk(id);
        res.status(200).json({ message: "Usuário atualizado com sucesso", user });
    } 
    catch (error){
        console.error('Erro', error);
        return res.status(500).json({ erro: 'Erro ao atualizar os dados do tutor' });
    }
};

export const login = async (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const { email, senha } = req.body;
        const user = await Usuario.findOne({ where: { email: email } })

        let passwordMatch = false

        if (user) {
            passwordMatch = await bcrypt.compare(senha, user.senha);  
        }


        if (user && passwordMatch) {
            const username = user.username
            const adminstrator = user.administrador     

            const token = jwt.sign({ username, adminstrator }, JWT_SECRET, { expiresIn: "1h" });
            res.send({"mensagem": 'Login bem sucedido', "token": token})
        } else {
            res.send({ "erro": "Email ou senha inválidos."})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({"erro": "Erro interno ao tentar fazer o login."})
    }
}