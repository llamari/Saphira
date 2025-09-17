import { sequelizeDatabase } from "./db.js"
import express from "express";

// Importing Controllers
import { login } from "./src/controllers/Auth.js";
import { donation } from "./src/controllers/Donations.js";
import adocoes from "./src/routes/adocoes.routes.js";
import animais from "./src/routes/animais.routes.js";
import questionario from "./src/routes/questionario.routes.js";
import { listAnimals, updateAnimal, deleteAnimal } from "./src/controllers/Animals.js";

const app = express();

app.use(express.json({ limit: '50mb' }));

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
app.use(adocoes);
app.use(animais);
app.use(questionario);

app.post('/doacoes', donation);

// Animal dashboard routes
app.get('/admin/animais/', listAnimals);
app.patch('/admin/animais/:id', updateAnimal);
app.delete('/admin/animais/:id', deleteAnimal);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    
    
    console.log(`Servidor rodando na porta ${PORT}`);
});