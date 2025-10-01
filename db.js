import { Sequelize } from 'sequelize';

export const sequelizeDatabase = new Sequelize('postgres', 'postgres', 'HN=K_*&)3wvd\'w^', {
    host: 'db.rnijhpbkaglkecafztog.supabase.co',
    port: '5432',
    dialect: 'postgres',
    logging: false,
});