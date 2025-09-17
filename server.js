import { sequelizeDatabase } from "./db.js"
import express from "express";

import Usuario from "./src/models/Usuario.js";

// Importing routes
import adocoes from "./src/routes/adocoes.routes.js";
import animais from "./src/routes/animais.routes.js";
import questionario from "./src/routes/questionario.routes.js";
import userRoutes from "./src/routes.js/usersRoutes.js";

// Importing Controllers
import { login } from "./src/controllers/Auth.js";
import { donation } from "./src/controllers/Donations.js";
<<<<<<< HEAD
import adocoes from "./src/routes/adocoes.routes.js";
import animais from "./src/routes/animais.routes.js";
import questionario from "./src/routes/questionario.routes.js";
=======
import { listAnimals, updateAnimal, deleteAnimal } from "./src/controllers/Animals.js";
>>>>>>> 5ea5778ed7c0177064bdd16e84234debb297fba0

const app = express();
app.use(express.json({ limit: '50mb' }));

// Synchronizing the database
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

// Registering Routes
app.use(adocoes);
app.use(animais);
app.use(questionario);
app.use(userRoutes);

app.post('/doacoes', donation);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    
    
    console.log(`Servidor rodando na porta ${PORT}`);
});
