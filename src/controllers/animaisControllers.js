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
        descricao
    } = req.body;

    const foto = req.file;

    if (!nome || !especie || !porte || !castrado || !vacinado || !descricao) return res.status(400).send({ "erro": "Todos os campos obrigatórios devem ser preenchidos corretamente." })

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