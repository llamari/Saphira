'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("doacao", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    valor: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    linkPix: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mensagem: {
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
    await queryInterface.dropTable("doacao");
}
