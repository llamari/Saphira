import { Sequelize } from 'sequelize';

export const sequelizeDatabase = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});