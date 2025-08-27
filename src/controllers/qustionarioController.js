import Questionario from "../models/Questionario";

export const postQuestionario = async(req,res) => {
    const body = req.body;
    
    try {
        await Questionario.create(body);
        return res.status(200).send(body);
    } catch (error) {
        return res.status(500).send({"erro": "Erro ao registrar o pedido de adoção"});
    }
}