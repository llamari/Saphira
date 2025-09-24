import { Animal } from "../models/Animal.js";
import { Op, fn, col, where } from "sequelize";

export const GetAnimals = async (req, res) => {
    try {
        //Filtro de busca
        let { especie, porte, castrado, vacinado, sort } = req.query;

        // função auxiliar para limpar aspas e espaços
        const cleanStr = (v) =>
            typeof v === "string" ? v.replace(/^["']|["']$/g, "").trim() : v;

        especie = cleanStr(especie);
        porte = cleanStr(porte);
        sort = cleanStr(sort);

        const whereConditions = [];

        // filtro parcial e case-insensitive
        if (especie) {
            whereConditions.push(
                where(fn("LOWER", col("especie")), {
                    [Op.like]: `%${especie.toLowerCase()}%`,
                })
            );
        }

        if (porte) {
            whereConditions.push(
                where(fn("LOWER", col("porte")), {
                    [Op.like]: `%${porte.toLowerCase()}%`,
                })
            );
        }

        if (castrado !== undefined) {
            whereConditions.push({ castrado: castrado === "true" });
        }

        if (vacinado !== undefined) {
            whereConditions.push({ vacinado: vacinado === "true" });
        }

        const whereClause =
            whereConditions.length > 0 ? { [Op.and]: whereConditions } : {};

        //Ordenação
        let order = [["createdAt", "ASC"]]; // padrão = mais antigo primeiro
        if (sort === "recentes") {
            order = [["createdAt", "DESC"]]; // mais recente primeiro
        }

        const animais = await Animal.findAll({
            where: whereClause,
            order: order
        });

        res.status(201).send({ message: 'Sucesso', animais });
    } catch (error) {
        console.error({ message: 'Erro', error });
        return res.status(500).json({ error: 'Erro ao buscar animais' });
    }
};

export const GetAnimalsId = async (req, res) => {
    try {
        const animalId = req.params.id;

        const animal = await Animal.findOne({ where: { id: animalId } });

        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado" });
        }

        res.status(201).json({ message: "Sucesso", animal });
    } catch (error) {
        console.error("Erro ao buscar animal:", error);
        return res.status(500).json({ error: "Erro ao buscar animal" });
    }
};