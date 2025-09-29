'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('questionarios', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    empregado: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    quantos_animais_possui: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    motivos_para_adotar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quem_vai_sustentar_o_animal: {
      type: Sequelize.STRING,
      allowNull: false
    },
    numero_adultos_na_casa: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    numero_criancas_na_casa: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idades_criancas: {
      type: Sequelize.STRING,
      get() {
        const raw = this.getDataValue('idades_criancas');
        return raw ? JSON.parse(raw) : [];
      },
      set(value) {
        this.setDataValue('idades_criancas', JSON.stringify(value));
      },
      allowNull: true // Assumindo que pode ser nulo se não houver crianças.
    },
    residencia_tipo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    proprietario_permite_animais: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    todos_de_acordo_com_adocao: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    responsavel_pelo_animal: {
      type: Sequelize.STRING,
      allowNull: false
    },
    responsavel_concorda_com_adocao: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    ha_alergico_ou_pessoas_que_nao_gostam: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    gasto_mensal_estimado: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    valor_disponivel_no_orcamento: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    tipo_alimentacao: {
      type: Sequelize.STRING,
      allowNull: false
    },
    local_que_o_animal_vai_ficar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    forma_de_permanencia: {
      type: Sequelize.STRING,
      allowNull: false
    },
    forma_de_confinamento: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tera_brinquedos: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    tera_abrigo: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    tera_passeios_acompanhado: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    tera_passeios_sozinho: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    companhia_outro_animal: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    companhia_humana_24h: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    companhia_humana_parcial: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    sem_companhia_humana: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    sem_companhia_animal: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    o_que_faz_em_viagem: {
      type: Sequelize.STRING,
      allowNull: false
    },
    o_que_faz_se_fugir: {
      type: Sequelize.STRING,
      allowNull: false
    },
    o_que_faz_se_nao_puder_criar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    animais_que_ja_criou: {
      type: Sequelize.STRING,
      allowNull: false
    },
    destino_animais_anteriores: {
      type: Sequelize.STRING,
      allowNull: false
    },
    costuma_esterilizar: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    costuma_vacinar: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    costuma_vermifugar: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    veterinario_usual: {
      type: Sequelize.STRING,
      allowNull: false
    },
    forma_de_educar: {
      type: Sequelize.STRING,
      allowNull: false
    },
    envia_fotos_e_videos_do_local: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    aceita_visitas_e_fotos_do_animal: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    topa_entrar_grupo_adotantes: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    concorda_com_taxa_adocao: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    data_disponivel_para_buscar_animal: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt:{
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt:{
      type: Sequelize.DATE,
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("questionarios");
}
