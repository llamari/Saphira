import { sequelizeDatabase } from "./db.js"
import express from "express";
import { login } from "./src/controllers/Auth.js";
import { donation } from "./src/controllers/Donations.js";

const app = express();

app.use(express.json());

(async () => {
    try {
        await sequelizeDatabase.sync();
        console.log('Banco sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco:', error);
    }
})();

app.get('/', (req, res) => res.send("API da Saphira rodando!"))

app.post('/auth', login);

app.post('/donate', donation);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    
    console.log(`Servidor rodando na porta ${PORT}`);
});