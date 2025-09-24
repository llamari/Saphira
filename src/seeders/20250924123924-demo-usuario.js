'use strict';


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
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Usuario", null, {});
}
