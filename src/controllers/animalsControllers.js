import Animal from "../models/Animal";

export const GetAnimals = async (req, res) => {
    try {
        //Terminar os filtros
        //Fazendo o filtro de busca
        const {especie, porte, castrado, vacinado, adotado} = req.query;
        let filter = {};
        if (especie) filter.especie = especie;
        if (porte) filter.porte = porte;
        if (castrado) filter.castrado = castrado === 'true';
        if (vacinado) filter.vacinado = vacinado === 'true';

        //Fazer ordenação de busca

        const animais = await Animal.findALL();
        res.status(201).send({ message: 'Sucesso', animais });
    } catch (error) {
        console.error({ message: 'Erro', error });
        return res.status(500).json({ error: 'Erro ao buscar animais' });
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