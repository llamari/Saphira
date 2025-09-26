import PedidoAdocao from "../models/PedidoAdocao.js"

export const postAdocoes = async(req,res) => {
    const {tutor_id, animal_id, status, posicao_fila} = req.body;

    if(!tutor_id || !animal_id || !status || !posicao_fila) return res.status(400).send({"erro": "O tutor ainda não respondeu o questionário obrigatório"})

    try{
        const pedidoAdocao = await PedidoAdocao.create({
            tutorId: tutor_id,
            animalId: animal_id, 
            status,
            posicao_fila
        })

        res.status(201).send(pedidoAdocao)
    }catch(error){
        if(error.name === "SequelizeUniqueConstraintError") return res.status(409).send({"erro": "Este tutor já tem um pedido de adoção para este animal"});
        if(error.name === "SequelizeForeignKeyConstraintError") return res.status(404).send({"erro": "Tutor ou animal não encontrado"});
        
        return res.status(500).send({"erro": "Erro ao registrar o pedido de adoção"});
    }

}

