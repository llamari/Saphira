import fs from "fs";

const logRequisicoes = (req,res,next) => {
    const method = req.method;
    const date = new Date().toISOString();
    const url = req.url;
    const ip = req.ip;

    const log = `req: ${method} ${url}, date: ${date}, user: ${ip}\n`

    fs.appendFile("logRequisicoes.log", log, (err) => {
        if(err){
            console.error("erro ao registar requisição");
        }
    })

    next();
}

export default logRequisicoes;