import Animal from "../models/Animal";

export const GetAnimals = async (req, res) => {
    try {
        //Filtro de busca
        const { especie, porte, castrado, vacinado } = req.query;
        let filter = {};
        if (especie) filter.especie = especie;
        if (porte) filter.porte = porte;
        if (castrado) filter.castrado = castrado === 'true';
        if (vacinado) filter.vacinado = vacinado === 'true';

        //Ordenação de busca
        let ordenacao = { createdAt: 1 };
        if (sort === "recentes") {
            ordenacao = { createdAt: -1 };
        }

        const animais = await Animal.findALL(filter).sort(ordenacao);

        res.status(201).send({ message: 'Sucesso', animais });
    } catch (error) {
        console.error({ message: 'Erro', error });
        return res.status(500).json({ error: 'Erro ao buscar animais' });
    }
};

export const GetAnimalsId = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = Animal.findOne({ where: { id: animalId } });
        res.status(201).send({ message: 'Sucesso', animal });
    } catch (error) {
        console.error({ message: 'Erro', error });
        return res.status(500).json({ error: 'Erro ao buscar animal' });
    }
};