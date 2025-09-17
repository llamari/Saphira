import Usuario from "../models/Usuario.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await Usuario.findOne({ where: { email: email } })

        const username = user.username
        const adminstrator = user.administrador

        if (user && user.senha === senha) {
            const token = jwt.sign({ username, adminstrator }, JWT_SECRET, { expiresIn: "1h" });
            res.send({"mensagem": 'Login bem sucedido', "token": token})
        } else {
            res.send({ "erro": "Email ou senha inválidos." })
        }
    } catch (error) {
        res.send({"erro": "Erro interno ao tentar fazer o login."})
    }
}