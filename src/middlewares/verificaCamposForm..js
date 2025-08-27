import express from "express";

export default function verificadorCamposForm(req, res, next){ 
    const campos = [
        empregado,
        quantos_animais_possui,
        motivos_para_adotar,
        quem_vai_sustentar_o_animal,
        numero_adultos_na_casa,
        numero_criancas_na_casa,
        idades_criancas,
        residencia_tipo,
        proprietario_permite_animais,
        todos_de_acordo_com_adocao,
        responsavel_pelo_animal,
        responsavel_concorda_com_adocao,
        ha_alergico_ou_pessoas_que_nao_gostam,
        gasto_mensal_estimado,
        valor_disponivel_no_orcamento,
        tipo_alimentacao,
        local_que_o_animal_vai_ficar,
        forma_de_permanencia,
        forma_de_confinamento,
        tera_brinquedos,
        tera_abrigo,
        tera_passeios_acompanhado,
        tera_passeios_sozinho,
        companhia_outro_animal,
        companhia_humana_24h,
        companhia_humana_parcial,
        sem_companhia_humana,
        sem_companhia_animal,
        o_que_faz_em_viagem,
        o_que_faz_se_fugir,
        o_que_faz_se_nao_puder_criar,
        animais_que_ja_criou,
        destino_animais_anteriores,
        costuma_esterilizar,
        costuma_vacinar,
        costuma_vermifugar,
        veterinario_usual,
        forma_de_educar,
        envia_fotos_e_videos_do_local,
        aceita_visitas_e_fotos_do_animal,
        topa_entrar_grupo_adotantes,
        concorda_com_taxa_adocao,
        data_disponivel_para_buscar_animal      
    ];
    
    const faltando = campos.filter(campo => !(campo in req.body)).length;

    if(faltando > 0) res.status(400).send({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});

    next();

}