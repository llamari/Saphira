import { Animal } from "../models/Animal.js";
import multer from "multer";
const upload = multer();

export const postAnimal = [upload.single('foto'), async (req, res) => {
    const {
        nome,
        especie,
        porte,
        castrado,
        vacinado,
        descricao,
        foto,
    } = req.body;

    if (!nome || !especie || !porte || !castrado || !vacinado || !descricao || !foto) return res.status(400).send({ "erro": "Todos os campos obrigatórios devem ser preenchidos corretamente." })

    try {
        const animal = await Animal.create({
            nome,
            especie,
            porte,
            castrado,
            vacinado,
            descricao,
            foto,
        })
        return res.send({ animal })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "erro": "Erro interno ao cadastrar o animal." });
    }

}
]

export const listAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll();
        res.status(200).send({data: animals, total: animals.length})
    } catch (error) {
        res.status(500).send({erro: "Erro ao buscar animais"});
    }
    
}

export const updateAnimal = async (req, res) => {
    const updates = {};

    if ('nome' in req.body) updates.nome = req.body.nome;
    if ('especie' in req.body) updates.especie = req.body.especie;
    if ('porte' in req.body) updates.porte = req.body.porte;
    if ('castrado' in req.body) updates.castrado = req.body.castrado;
    if ('vacinado' in req.body) updates.vacinado = req.body.vacinado;
    if ('adotado' in req.body) updates.adotado = req.body.adotado;
    if ('descricao' in req.body) updates.descricao = req.body.descricao;
    if ('foto' in req.body) updates.foto = req.body.foto;

    const target_id = req.params.id 

    try {
        const [updatedCount] = await Animal.update(updates, {where: { id: target_id } });
    
        if (updatedCount == 0) {
            return res.status(404).send({erro: "Animal Não Encontrado"})
        } else {
            const now = new Date();
            const isoString = now.toISOString();
            updates.updated_at = isoString; 
            
            return res.status(200).send(updates)
        }           
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
            // Field mismatch maybe
            return res.status(400).json({ erro: "Nenhum campo foi fornecido para atualização" });
          }

        console.log("Unexpected error! - ");
        console.log(error);
        return res.status(500).send("Erro ao atualizar animal");
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        const deletedCount = await Animal.destroy({ where: { id: req.params.id } });

        if (deletedCount == 0) {
            return res.status(404).send({erro: "Animal não encontrado"})
        }

        return res.status(204).send({message: "Animal removido com sucesso"})
    } catch {
        return res.status(500).send({erro: "Erro ao remover animal"})
    }
}