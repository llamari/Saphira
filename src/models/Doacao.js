import { DataTypes } from 'sequelize';
import { sequelizeDatabase } from '../../db.js';

const Doacao = sequelizeDatabase.define('doacao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    linkPix: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mensagem: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'Doacao',
    timestamps: true
});

export default Doacao;