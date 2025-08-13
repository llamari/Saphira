import Animal from "../models/Animal";

export const GetAnimals = async (req, res) => {
    try {
        const animais = await Animal.findALL();
        res.status(200).send({ message: 'Sucesso', animais });
    } catch (error) {
        console.error({ message: 'Erro', error });
        return res.status(500).json({ error: 'Erro inesperado' });
    }
};

export const GetAnimalsId = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = Animal.findOne({where: {id: animalId}});
        res.status(200).send({ message: 'Sucesso', animal });
    } catch (error) {
        console.error({ message: 'Erro', error });
        return res.status(500).json({ error: 'Erro inesperado' });
    }
};