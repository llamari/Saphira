import { describe, jest, test, afterEach } from '@jest/globals';
import { postAnimal } from '../../controllers/animaisControllers';
import { Animal } from '../../models/Animal';

jest.mock('../../models/Animal', () => ({
    Animal: {
        create: jest.fn()
    }
}));

describe('Teste dos animais', () => {
    const mockRequest = (body = {}, file = undefined) => ({ body, file });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        return res;
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    const postAnimalHandler = postAnimal[1];

    test('postAnimal deve criar um animal e retorná-lo (sem foto)', async () => {
        const animalData = {
            nome: "Nick",
            especie: "Cachorro",
            porte: "Pequeno",
            castrado: true,
            vacinado: true,
            descricao: "Cachorro acima do peso, de idade avançada e pouco pelo"
        };

        const req = mockRequest(animalData, { buffer: Buffer.from('') });
        const res = mockResponse();

        const mockAnimalCreated = {
            ...animalData,
            foto: undefined
        };

        Animal.create.mockResolvedValue(mockAnimalCreated);

        await postAnimalHandler(req, res);

        expect(Animal.create).toHaveBeenCalledWith({
            ...animalData,
            foto: Buffer.from('')
        });

        expect(res.send).toHaveBeenCalledWith({ animal: mockAnimalCreated });
    });

    test('postAnimal deve retornar 400 se faltar algum campo obrigatório', async () => {
        const animalData = {
            nome: "Nick",
            especie: "",
            porte: "Pequeno",
            castrado: true,
            vacinado: true,
            descricao: "Cachorro acima do peso"
        };

        const req = mockRequest(animalData);
        const res = mockResponse();

        await postAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            erro: "Todos os campos obrigatórios devem ser preenchidos corretamente."
        });

        expect(Animal.create).not.toHaveBeenCalled();
    });

    test('postAnimal deve retornar 500 em caso de erro interno', async () => {
        const animalData = {
            nome: "Nick",
            especie: "Cachorro",
            porte: "Pequeno",
            castrado: true,
            vacinado: true,
            descricao: "Cachorro acima do peso"
        };

        const req = mockRequest(animalData);
        const res = mockResponse();

        Animal.create.mockRejectedValue(new Error("DB error"));

        await postAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            erro: "Erro interno ao cadastrar o animal."
        });
    });
});
