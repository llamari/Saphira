import { sequelizeDatabase } from "./db.js"
import express from "express";
import "dotenv/config";

// Importing routes
import adocoes from "./src/routes/adocoes.routes.js";
import animais from "./src/routes/animais.routes.js";
import animais_admin from "./src/routes/animais_dashboard.routes.js";
import doacoes from "./src/routes/doacoes.routes.js";
import questionario from "./src/routes/questionario.routes.js";
import users from "./src/routes/users.routes.js";

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


// Registering Routes
app.use("/adocoes", adocoes);
app.use("/animais", animais);
app.use("/admin/animais", animais_admin)
app.use("/doacoes", doacoes);
app.use("/questionario", questionario);
app.use(users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
