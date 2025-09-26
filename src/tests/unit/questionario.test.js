import { describe, jest, test, afterEach } from '@jest/globals';
import { postQuestionario } from '../../controllers/questionario.controller.js';
import Questionario from '../../models/Questionario.js';

jest.mock('../../models/Questionario', () => ({
    __esModule: true,
    default: {
        create: jest.fn()
    }
}));

describe('Teste dos questionários', () => {
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

    const postQuestionarioHandler = postQuestionario;

    test('postQuestionario deve criar um questionário e retorná-lo', async () => {
        const questionarioData = {
            empregado: true,
            quantos_animais_possui: 2,
            motivos_para_adotar: "Quero companhia para minha família e ensinar responsabilidade às crianças",
            quem_vai_sustentar_o_animal: "Eu e meu cônjuge",
            numero_adultos_na_casa: 2,
            numero_criancas_na_casa: 2,
            idades_criancas: ["5", "8"],
            residencia_tipo: "própria",
            proprietario_permite_animais: true,
            todos_de_acordo_com_adocao: true,
            responsavel_pelo_animal: "Eu",
            responsavel_concorda_com_adocao: true,
            ha_alergico_ou_pessoas_que_nao_gostam: false,
            gasto_mensal_estimado: 300,
            valor_disponivel_no_orcamento: true,
            tipo_alimentacao: "ração",
            local_que_o_animal_vai_ficar: "dentro de casa",
            forma_de_permanencia: "preso parte do dia",
            forma_de_confinamento: "área fechada",
            tera_brinquedos: true,
            tera_abrigo: true,
            tera_passeios_acompanhado: true,
            tera_passeios_sozinho: false,
            companhia_outro_animal: true,
            companhia_humana_24h: false,
            companhia_humana_parcial: true,
            sem_companhia_humana: false,
            sem_companhia_animal: false,
            o_que_faz_em_viagem: "Deixa com familiares ou amigo de confiança",
            o_que_faz_se_fugir: "Procuro imediatamente pelo bairro e notifico vizinhos",
            o_que_faz_se_nao_puder_criar: "Procuro abrigo ou tutor temporário responsável",
            animais_que_ja_criou: "Cachorros e gatos",
            destino_animais_anteriores: "Todos foram adotados por amigos e familiares",
            costuma_esterilizar: true,
            costuma_vacinar: true,
            costuma_vermifugar: true,
            veterinario_usual: "Clínica Vet Saúde",
            forma_de_educar: "Reforço positivo com carinho e petiscos",
            envia_fotos_e_videos_do_local: true,
            aceita_visitas_e_fotos_do_animal: true,
            topa_entrar_grupo_adotantes: true,
            concorda_com_taxa_adocao: true,
            data_disponivel_para_buscar_animal: "2025-10-01"
        };

        const req = mockRequest(questionarioData);
        const res = mockResponse();

        Questionario.create = jest.fn().mockResolvedValue(questionarioData);

        await postQuestionarioHandler(req, res);

        expect(Questionario.create).toHaveBeenCalledWith(questionarioData);

        expect(res.send).toHaveBeenCalledWith(questionarioData);
    });

    test('postQuestionario deve retornar 500 em caso de erro interno', async () => {
        const questionarioData = {
            empregado: true,
            quantos_animais_possui: 2,
            motivos_para_adotar: "Quero companhia para minha família e ensinar responsabilidade às crianças",
            quem_vai_sustentar_o_animal: "Eu e meu cônjuge",
            numero_adultos_na_casa: 2,
            numero_criancas_na_casa: 2,
            idades_criancas: ["5", "8"],
            residencia_tipo: "própria",
            proprietario_permite_animais: true,
            todos_de_acordo_com_adocao: true,
            responsavel_pelo_animal: "Eu",
            responsavel_concorda_com_adocao: true,
            ha_alergico_ou_pessoas_que_nao_gostam: false,
            gasto_mensal_estimado: 300,
            valor_disponivel_no_orcamento: true,
            tipo_alimentacao: "ração",
            local_que_o_animal_vai_ficar: "dentro de casa",
            forma_de_permanencia: "preso parte do dia",
            forma_de_confinamento: "área fechada",
            tera_brinquedos: true,
            tera_abrigo: true,
            tera_passeios_acompanhado: true,
            tera_passeios_sozinho: false,
            companhia_outro_animal: true,
            companhia_humana_24h: false,
            companhia_humana_parcial: true,
            sem_companhia_humana: false,
            sem_companhia_animal: false,
            o_que_faz_em_viagem: "Deixa com familiares ou amigo de confiança",
            o_que_faz_se_fugir: "Procuro imediatamente pelo bairro e notifico vizinhos",
            o_que_faz_se_nao_puder_criar: "Procuro abrigo ou tutor temporário responsável",
            animais_que_ja_criou: "Cachorros e gatos",
            destino_animais_anteriores: "Todos foram adotados por amigos e familiares",
            costuma_esterilizar: true,
            costuma_vacinar: true,
            costuma_vermifugar: true,
            veterinario_usual: "Clínica Vet Saúde",
            forma_de_educar: "Reforço positivo com carinho e petiscos",
            envia_fotos_e_videos_do_local: true,
            aceita_visitas_e_fotos_do_animal: true,
            topa_entrar_grupo_adotantes: true,
            concorda_com_taxa_adocao: true,
            data_disponivel_para_buscar_animal: "2025-10-01"
        };

        const req = mockRequest(questionarioData);
        const res = mockResponse();

        Questionario.create = jest.fn().mockRejectedValue(new Error("DB error"));

        await postQuestionarioHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            erro: "Erro ao registrar o pedido de adoção"
        });
    });
});
