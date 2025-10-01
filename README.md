# Saphira Sistema de Adoção - API REST com Node.js

## 📌 Sobre o projeto
O Saphira é uma API desenvolvida no modelo REST, o objetivo do sistema é gerenciar e facilitar o processo de adoções de animais. 

## ⚙️ Funcionalidades e Endpoints
### 🔹 Cadastro de Animais -> POST/animais
✏️ Descrição: Faz o registro de um novo animal para a adoção.

### 🔹 Cadastro de Tutor -> POST/tutores
✏️ Descrição: Registro um novo usuário ao sistema com seus dados.

### 🔹 Questionário de Responsabilidade -> POST/questionario
✏️ Descrição: Para poder realizar a adoção de um animal, antes é necessário o respectivo tutor responder ao questionário de responsabilidade.

## Documentação

### Rodando o projeto 

Em ambiente de desenvolvimento, utilize o comando no diretório do projeto:

```
npm run dev
```

Para ambiente de produção, rode:

```
npm run start
```


### Seed do banco de dados

Para realizar o seed do banco de dados, o populando com dados de exemplo, rode o seguinte comando no diretório principal do projeto:

```shell
npm run seed
```

Este comando não vai rodar caso o banco já esteja populado com os dados. Se quer repopular com outros dados **limpe o banco de dados** utilizando o comando:

```shell
npm run seed:undo
```

### Unit tests

Para rodar os unit tests, simplesmente use o seguinte comando do diretório principal do projeto:

```shell
npm run tests:unit
```

## Bibliotecas

### Babel

É um tipo de compilador de JavaScript que permite escrever código ES6+ mas ainda sendo compatível com o ambiente runtime da máquina. No nosso caso, era necessário para compatibilidade do Jest.

### Jest

Biblioteca usada para realizar os testes unitários em todas as funções do projeto, rodando funções automatizadas verificando se a lógica do código permanece consistente.
Dentro da pasta ``/tests`` estão todos os arquivos, e eles testam separadamente cada função em um contexto muito controlado.

### Bcrypt

Bibliotetaca de criptografia que é usada para criptografar as senhas dos usuários durante o cadastro, bem como fazer a comparação com a senha criptografada.
A senha é transformada em um hash, e esse hash é salvo no banco de dados.
Quando o usuário realiza um login, a biblioteca compara o hash da senha enviada com o hash da senha cadastrada e retorna uma resposta dizendo se é compatível ou não. 


### Dotenv

Uma biblioteca para ler o um arquivo .env no diretório do projeto e expor as variáveis no contexto global dentro de process.env 

### UUID 

Uma biblioteca simples para gerar um UUID - Identificador único sem usar números incrementais de geralmente 128-bits aleatórois. A chance de uma colisão é praticamente nula e então é usada como chave primária para os modelos no banco de dados.

### JsonWebToken

Biblioteca usada para gerar e conferir a autenticidade de JWT's (Json Web Token), usada no login para retornar um JWT válido e nos middlewares de autenticação presentes em *todas* as rotas, exceto a de login.

**INTEGRANTES:**
Beatriz Vinguerti Xavier,
Felipe Hiroshi Carvalho Dinnouti,
Gabriel Ziani Alves,
Sara Lamari Silva,
Vitor Paiva Nunes de Paula

Link do repositório do Alex: 
[repositorio](https://github.com/alexnasciment3/projeto_bento_2S_2025.git)
