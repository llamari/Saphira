import Usuario from "../models/Usuario.js";

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await Usuario.findOne({ where: { email: email } })
        if (user && user.senha === senha) {
            res.send('Login bem sucedido')
        } else {
            res.send({ "erro": "Email ou senha inválidos." })
        }
    } catch (error) {
        console.log(error)
        res.send({"erro": "Erro interno ao tentar fazer o login."})
    }
}