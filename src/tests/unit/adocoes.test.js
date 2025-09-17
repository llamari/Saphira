import { describe, jest, test, afterEach } from '@jest/globals';
import PedidoAdocao from '../../models/PedidoAdocao';
import { postAdocoes } from '../../controllers/adocoesControllers';

jest.mock('../../models/PedidoAdocao', () => ({
    __esModule: true, // para garantir compatibilidade ESM se usar import/export
    default: {
        create: jest.fn()
    }
}));

describe('Teste dos pedidos de adoção', () => {
    const mockRequest = (body = {}) => ({ body });

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

    const postAdocaoHandler = postAdocoes;

    test('postAdocoes deve criar um pedido de adoção e retorná-lo', async () => {
        const adocaoData = {
            tutor_id: "1",
            animal_id: "1",
            status: "em_analise",
            posicao_fila: 1,
        };

        const req = mockRequest(adocaoData);
        const res = mockResponse();

        const mockAdocaoCreated = {
            ...adocaoData,
            foto: undefined
        };

        PedidoAdocao.create = jest.fn().mockResolvedValue(mockAdocaoCreated);

        await postAdocaoHandler(req, res);

        expect(PedidoAdocao.create).toHaveBeenCalledWith({
            animalId: mockAdocaoCreated.animal_id,
            foto: undefined,
            posicao_fila: mockAdocaoCreated.posicao_fila,
            status: mockAdocaoCreated.status,
            tutorId: mockAdocaoCreated.tutor_id
        });

        expect(res.send).toHaveBeenCalledWith({
            animal_id: mockAdocaoCreated.animal_id,
            foto: undefined,
            posicao_fila: mockAdocaoCreated.posicao_fila,
            status: mockAdocaoCreated.status,
            tutor_id: mockAdocaoCreated.tutor_id
        });
    });

    test('postPedidoAdocao deve retornar 400 se faltar algum campo obrigatório', async () => {
        const pedidoAdocao = {
            tutor_id: "",
            animal_id: "1",
            status: "em_analise",
            posicao_fila: 1,
        };

        const req = mockRequest(pedidoAdocao);
        const res = mockResponse();

        await postAdocaoHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            erro: "O tutor ainda não respondeu o questionário obrigatório"
        });

        expect(PedidoAdocao.create).not.toHaveBeenCalled();
    });

    test('postPedidoAdocao deve retornar 500 em caso de erro interno', async () => {
        const adocaoData = {
            tutor_id: "1",
            animal_id: "1",
            status: "em_analise",
            posicao_fila: 1,
        };

        const req = mockRequest(adocaoData);
        const res = mockResponse();

        PedidoAdocao.create = jest.fn().mockRejectedValue(new Error("DB error"));

        await postAdocaoHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            erro: "Erro ao registrar o pedido de adoção"
        });
    });
});
