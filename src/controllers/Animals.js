import { Animal } from '../models/Animal.js'

const listAnimals = async (req, res) => {
    console.log(Animal)

    try {
        const animals = await Animal.findAll();
        res.status(200).send({data: animals, total: animals.length})
    } catch (error) {
        console.log("Unexpected error! - ");
        console.log(error);
        res.status(500).send({erro: "Erro ao buscar animais"});
    }
    
}

const updateAnimal = async (req, res) => {
    const updates = {};

    if ('nome' in req.body) updates.nome = req.body.nome;
    if ('especie' in req.body) updates.especie = req.body.especie;
    if ('porte' in req.body) updates.porte = req.body.porte;
    if ('castrado' in req.body) updates.castrado = req.body.castrado;
    if ('vacinado' in req.body) updates.vacinado = req.body.vacinado;
    if ('adotado' in req.body) updates.adotado = req.body.adotado;
    if ('descricao' in req.body) updates.descricao = req.body.descricao;
    if ('foto' in req.body) updates.foto = req.body.foto;

    console.log("Trying to find by id: " + req.params.id)

    let animal

    try {
        animal = await Animal.findByPk(req.params.id);
    } catch (error) {
        animal = null
        return res.status(500).json({erro: "Erro Interno ao Encontrar Animal"})
    }

    if (!animal) {
       return res.status(404).json({erro: "Animal não encontrado"})
    }

    try {
        const [updatedCount] = await Animal.update(updates, {where: { id: req.params.id } });
    
        if (updatedCount == 0) {
            return res.status(404).send({erro: "Animal Não Atualizado"})
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
const deleteAnimal = async (req, res) => {
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

export { listAnimals, updateAnimal, deleteAnimal }