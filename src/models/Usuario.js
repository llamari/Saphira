import { DataTypes } from 'sequelize';
import { sequelizeDatabase } from '../../db.js';

const Usuario = sequelizeDatabase.define('usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nome_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cep: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    administrador: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: new Date()
    },
    updatedAt:{
        type: DataTypes.DATE,
    }
}, {
    tableName: 'Usuario',
    timestamps: true
});

export default Usuario