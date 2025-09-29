'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('pedidos_adocao', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'em_analise',
      allowNull: false
    },
    posicao_fila: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    tutorId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true
    },
    animalId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true
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
  await queryInterface.dropTable("pedidos_adocao");
}
