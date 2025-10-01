'use strict';
import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('questionarios', 'tutorId', {
      type: DataTypes.UUID,
      allowNull: false,
  })
}
export async function down(queryInterface, Sequelize) {
}
