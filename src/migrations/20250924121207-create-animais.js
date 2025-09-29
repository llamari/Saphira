'use strict';


/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('animais', {
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
      especie: {
          type: Sequelize.STRING,
          allowNull: false
      },
      porte: {
          type: Sequelize.STRING,
          allowNull: false
      },
      castrado: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      vacinado: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      adotado: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      descricao: {
          type: Sequelize.STRING,
          allowNull: false
      },
      foto: {
          type: Sequelize.BLOB('long'),
          allowNull: true
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt:{
        type: Sequelize.DATE,
      }
    })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('animais');
}
