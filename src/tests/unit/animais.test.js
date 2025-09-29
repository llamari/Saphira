import { describe, jest, test, afterEach } from '@jest/globals';
import { deleteAnimal, GetAnimals, GetAnimalsId, listAnimals, postAnimal, updateAnimal } from '../../controllers/animais.controller.js';
import { Animal } from '../../models/Animal';

jest.mock('../../models/Animal', () => ({
    __esModule: true,
    Animal: {
        create: jest.fn(),
        destroy: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
    }
}));

describe('Teste dos animais', () => {
    const mockRequest = (body = {}, file = undefined) => ({ body, file });
    const mockRequestParams = (body = {}, params = {}) => ({ body, params });
    const mockRequestOnlyParams = (params = {}) => ({ params });

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
    const listAnimaisHandler = listAnimals;
    const updateAnimalHandler = updateAnimal;
    const deleteAnimalHandler = deleteAnimal;

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

        Animal.create = jest.fn().mockResolvedValue(mockAnimalCreated);

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

        Animal.create = jest.fn().mockRejectedValue(new Error("DB error"));

        await postAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            erro: "Erro interno ao cadastrar o animal."
        });
    });

    test('getAnimais deve retornar todos os animais do banco', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const mockAnimals = [
            { id: 1, nome: "Nick", especie: "Cachorro" },
            { id: 2, nome: "Mimi", especie: "Gato" }
        ];
        Animal.findAll = jest.fn().mockResolvedValue(mockAnimals);
        await listAnimaisHandler(req, res);

        expect(res.send).toHaveBeenCalledWith({ data: mockAnimals, total: mockAnimals.length });
    });

    test('getAnimais deve retornar 500 em caso de erro interno', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Animal.findAll = jest.fn().mockRejectedValue(new Error("DB error"));

        await listAnimaisHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            erro: "Erro ao buscar animais"
        });
    });

    test('deve atualizar o animal e retornar 200 com os dados atualizados', async () => {
        const req = mockRequestParams(
            {
                nome: "Bidu",
                castrado: true
            },
            { id: "1" }
        );
        const res = mockResponse();

        Animal.update = jest.fn().mockResolvedValue([1]);

        const before = Date.now();
        await updateAnimalHandler(req, res);
        const after = Date.now();

        expect(Animal.update).toHaveBeenCalledWith(
            {
                nome: "Bidu",
                castrado: true,
                updated_at: expect.any(String)
            },
            { where: { id: "1" } }
        );

        expect(res.status).toHaveBeenCalledWith(200);

        const sentResponse = res.send.mock.calls[0][0];

        expect(sentResponse).toHaveProperty('nome', 'Bidu');
        expect(sentResponse).toHaveProperty('castrado', true);
        expect(sentResponse).toHaveProperty('updated_at');

        const updatedTime = new Date(sentResponse.updated_at).getTime();
        expect(updatedTime).toBeGreaterThanOrEqual(before);
        expect(updatedTime).toBeLessThanOrEqual(after);
    });

    test('deve retornar 404 se nenhum animal for encontrado', async () => {
        const req = mockRequestParams(
            { nome: "SemChance" },
            { id: "999" }
        );
        const res = mockResponse();

        Animal.update = jest.fn().mockResolvedValue([0]);

        await updateAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ erro: "Animal Não Encontrado" });
    });

    test('deve retornar 400 se ocorrer erro de validação do Sequelize', async () => {
        const req = mockRequestParams({ nome: "Teste" }, { id: "2" });
        const res = mockResponse();

        const error = new Error("Validation Error");
        error.name = "SequelizeValidationError";

        Animal.update = jest.fn().mockRejectedValue(error);

        await updateAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            erro: "Nenhum campo foi fornecido para atualização"
        });
    });

    test('deve retornar 500 em caso de erro inesperado', async () => {
        const req = mockRequestParams({ nome: "Bugado" }, { id: "3" });
        const res = mockResponse();

        const error = new Error("Algo quebrou!");
        error.name = "UnknownError";

        Animal.update = jest.fn().mockRejectedValue(error);

        await updateAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Erro ao atualizar animal");
    });

    test('deve deletar o animal e retornar 200', async () => {
        const req = mockRequestOnlyParams({ id: '1' });
        const res = mockResponse();

        Animal.destroy = jest.fn().mockResolvedValue(1);

        await deleteAnimalHandler(req, res);

        expect(Animal.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: "Animal removido com sucesso" });
    });

    test('deve retornar 404 se o animal não for encontrado', async () => {
        const req = mockRequestOnlyParams({ id: '999' });
        const res = mockResponse();

        Animal.destroy = jest.fn().mockResolvedValue(0); // Simula nenhum registro deletado

        await deleteAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ erro: "Animal não encontrado" });
    });

    test('deve retornar 500 em caso de erro inesperado', async () => {
        const req = mockRequestOnlyParams({ id: '1' });
        const res = mockResponse();

        Animal.destroy = jest.fn().mockRejectedValue(new Error('DB crash'));

        await deleteAnimalHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ erro: "Erro ao remover animal" });
    });

    test('GetAnimals deve retornar todos os animais com filtros aplicados', async () => {
        const req = { query: { especie: 'cachorro', sort: 'recentes' } };
        const res = mockResponse();

        const mockAnimals = [
            { id: 1, especie: 'Cachorro', porte: 'Pequeno' },
            { id: 2, especie: 'Cachorro', porte: 'Grande' }
        ];

        Animal.findAll = jest.fn().mockResolvedValue(mockAnimals);

        await GetAnimals(req, res);

        expect(Animal.findAll).toHaveBeenCalledWith(expect.objectContaining({
            where: expect.any(Object),
            order: [["createdAt", "DESC"]],
        }));

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'Sucesso', animais: mockAnimals });
    });

    test('GetAnimals deve retornar 500 em caso de erro', async () => {
        const req = { query: {} };
        const res = mockResponse();

        Animal.findAll = jest.fn().mockRejectedValue(new Error("DB error"));

        await GetAnimals(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar animais' });
    });

    test('GetAnimalsId deve retornar um animal por ID', async () => {
        const req = { params: { id: '1' } };
        const res = mockResponse();

        const mockAnimal = { id: 1, nome: 'Nick', especie: 'Cachorro' };
        Animal.findOne = jest.fn().mockResolvedValue(mockAnimal);

        await GetAnimalsId(req, res);

        expect(Animal.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Sucesso", animal: mockAnimal });
    });

    test('GetAnimalsId deve retornar 404 se não encontrar o animal', async () => {
        const req = { params: { id: '999' } };
        const res = mockResponse();

        Animal.findOne = jest.fn().mockResolvedValue(null);

        await GetAnimalsId(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Animal não encontrado" });
    });

    test('GetAnimalsId deve retornar 500 em caso de erro', async () => {
        const req = { params: { id: '1' } };
        const res = mockResponse();

        Animal.findOne = jest.fn().mockRejectedValue(new Error("DB error"));

        await GetAnimalsId(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar animal" });
    });
});
