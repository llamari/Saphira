import { Animal } from "../models/Animal.js";
import multer from "multer";
const upload = multer();
import { Op, fn, col, where } from "sequelize";

// User oriented - returns animals available for adoption
export const GetAnimals = async (req, res) => {
    try {
        // Search filters
        let { especie, porte, castrado, vacinado, sort } = req.query;

        // Helper function to clean spaces and quotes
        const cleanStr = (v) =>
            typeof v === "string" ? v.replace(/^["']|["']$/g, "").trim() : v;

        especie = cleanStr(especie);
        porte = cleanStr(porte);
        sort = cleanStr(sort);

        const whereConditions = [];

        // Case insensitive and partial filter
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

        let order = [["createdAt", "ASC"]]; // Default - Oldest first
        if (sort === "recentes") {
            order = [["createdAt", "DESC"]]; // Otherwise, use newer first
        }

        const animais = await Animal.findAll({
            where: whereClause,
            order: order
        });

        res.status(200).send({ message: 'Sucesso', animais });
    } catch (error) {
        console.log({ message: 'Erro', error });
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
        console.log("Erro ao buscar animal:", error);
        return res.status(500).json({ error: "Erro ao buscar animal" });
    }
};

export const postAnimal = [upload.single('foto'), async (req, res) => {
    let {
        nome,
        especie,
        porte,
        castrado,
        vacinado,
        descricao
    } = req.body;

    const foto = req.file

    if (!nome || !especie || !porte || (castrado !== false && castrado !== true) || (vacinado !== false && vacinado !== true) || !descricao) return res.status(400).send({ "erro": "Todos os campos obrigatórios devem ser preenchidos corretamente." })

    try {
        const animal = await Animal.create({
            nome,
            especie,
            porte,
            castrado,
            vacinado,
            descricao,
            foto: foto.buffer
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
        // TODO: Add filters
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

        return res.status(500).send("Erro ao atualizar animal");
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        const deletedCount = await Animal.destroy({ where: { id: req.params.id } });

        if (deletedCount == 0) {
            return res.status(404).send({erro: "Animal não encontrado"})
        }

        return res.status(200).send({message: "Animal removido com sucesso"})
    } catch {
        return res.status(500).send({erro: "Erro ao remover animal"})
    }
}