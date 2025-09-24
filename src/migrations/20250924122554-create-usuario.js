'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Usuario', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nome_completo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cidade: {
      type: Sequelize.STRING,
      allowNull: false
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: false
    },
    idade: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    celular: {
      type: Sequelize.STRING,
      allowNull: true
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: true
    },
    bairro: {
      type: Sequelize.STRING,
      allowNull: true
    },
    cep: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    instagram: {
      type: Sequelize.STRING,
      allowNull: true
    },
    facebook: {
      type: Sequelize.STRING,
      allowNull: true
    },
    administrador: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
  await queryInterface.dropTable("Usuario");
}
