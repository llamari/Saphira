import PedidoAdocao from "../models/PedidoAdocao.js";

export const postAdocoes = async(req,res) => {
    const {id, tutor_id, animal_id, status, posicao_fila} = req.body;

    if(!id || !tutor_id || !animal_id || !status || !posicao_fila) return res.status(400).send({"erro": "O tutor ainda não respondeu o questionário obrigatório"})

    try{
        PedidoAdocao.create({
            id,
            tutorId: tutor_id,
            anomalId: animal_id,
            status,
            posicao_fila
        })
    }catch(erro){
        return res.status(500).send({ "erro": "Erro ao registrar o pedido de adoção" });
    }

}

