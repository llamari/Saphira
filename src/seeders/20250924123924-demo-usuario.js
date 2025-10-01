'use strict';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("Usuario", [
    {
      id: uuidv4(),
      nome_completo: "admin",
      email: "admin@gmail.com",
      senha: "@adm123",
      cidade: "Campinas",
      estado: "SP",
      idade: 99,
      telefone: "32323232",
      celular: "1999999999",
      cpf: "99999999999",
      endereco: "Avenida Orosimbo Maia",
      bairro: "Cambuí",
      cep: 13024045,
      instagram: "@SaphiraOFC",
      facebook: "@SaphiraOFC",
      administrador: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nome_completo: "admin2",
      email: "admin2@gmail.com",
      senha: await bcrypt.hash("@adm123", 10),
      cidade: "Campinas",
      estado: "SP",
      idade: 93,
      telefone: "32323232",
      celular: "1999999999",
      cpf: "99999999889",
      endereco: "Avenida Orosimbo Maia",
      bairro: "Cambuí",
      cep: 13021045,
      instagram: "@SaphiraOFC",
      facebook: "@SaphiraOFC",
      administrador: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nome_completo: "Roberta Miranda",
      email: "robertinhamida@yahoo.com",
      senha: await bcrypt.hash("recebill", 10),
      cidade: "Araçatuba",
      estado: "SP",
      idade: 93,
      telefone: "32323232",
      celular: "1999999999",
      cpf: "99923999889",
      endereco: "Avenida Orosimbo Maia",
      bairro: "Cambuí",
      cep: 13021045,
      instagram: "@rumi",
      facebook: "@SaphiraOFC",
      administrador: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Usuario", null, {});
}
