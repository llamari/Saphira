import Usuario from "../models/Usuario.js";

export const GetUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } 
    catch (error) {
        console.error('Erro', error);
        return res.status(500).json({ error: 'Erro inesperado' });
    }
};

export const GetUsersId = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Usuario.findOne({where: {id: userId}});
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." })
        }
        res.status(200).json(user);
    } 
    catch (error) {
        console.error('Erro', error);
        return res.status(500).json({ error: 'Erro inesperado' });
    }
};

export const PostUsers = async (req, res) => {
    try {
        const { nome_completo, email, senha, cidade, estado, idade, telefone, celular, cpf, endereco, bairro, cep, instagram, facebook, administrador } = req.body;
        if (!nome_completo || !email || !senha || !cidade || !estado || !idade || !telefone || !celular || !cpf || !endereco || !bairro || !cep || !instagram || !facebook || !administrador) {
            return res.status(400).json({ error: "Preencha todos os campos." });
        }

        const newUser = await Usuario.create({ nome_completo, email, senha, cidade, estado, idade, telefone, celular, cpf, endereco, bairro, cep, instagram, facebook, administrador });
        console.log(newUser);
        res.status(201).json(newUser);
    } 
    catch (error) {
        console.error('Erro', error);
        return res.status(500).json({ error: 'Erro inesperado' });
    }
};

export const PatchUsersId = async (req, res) => {
    try {
        const { id } = req.params;
        const [userUpdated] = await Usuario.update(req.body, { where: { id }});
        if (userUpdated === 0){
            return res.status(404).json({ error: "Usuário não encontrado." })
        }

        const user = await Usuario.findByPk(id);
        res.status(200).json({ message: "Usuário atualizado com sucesso", user });
    } 
    catch (error){
        console.error('Erro', error);
        return res.status(500).json({ error: 'Erro inesperado' });
    }
};
