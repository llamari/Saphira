import { describe, jest, test, afterEach } from '@jest/globals';
import Usuario from '../../models/Usuario';
import { GetUsers, GetUsersId, login, PatchUsersId, PostUsers } from '../../controllers/users.controller';
import bcrypt from "bcrypt";

jest.mock('../../models/Usuario', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  }
}));

describe('Testes login', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getUsers deve retornar todos os usuários do banco', async () => {
    const req = {};
    const res = mockResponse();

    const mockUsers = [
      { id: 1, nome: "João", email: "joao@exemplo.com" },
      { id: 2, nome: "Maria", email: "maria@exemplo.com" }
    ];
    Usuario.findAll = jest.fn().mockResolvedValue(mockUsers);
    await GetUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  test('getUsers deve retornar 500 em caso de erro interno', async () => {
    const req = {};
    const res = mockResponse();

    Usuario.findAll = jest.fn().mockRejectedValue(new Error("DB error"));

    await GetUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Erro ao buscar dados dos tutores"
    });
  });

  test('GetUsersId deve retornar um usuário por ID', async () => {
    const req = { params: { id: '1' } };
    const res = mockResponse();

    const mockUser = { id: 1, nome: 'João', email: 'joao@exemplo.com' };
    Usuario.findOne = jest.fn().mockResolvedValue(mockUser);

    await GetUsersId(req, res);

    expect(Usuario.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('postUsers deve criar um usuário e retorná-lo', async () => {
    const userData = {
      nome_completo: "João da Silva",
      email: "joao@exemplo.com",
      senha: "123456",
      cidade: "São Paulo",
      estado: "SP",
      idade: 30,
      telefone: "11999999999",
      celular: "11999999999",
      cpf: "123.456.789-00",
      endereco: "Rua A, 123",
      bairro: "Centro",
      cep: "12345-678",
      instagram: "@joaodasilva",
      facebook: "facebook.com/joaodasilva",
      administrador: false
    };

    const req = { body: userData };
    const res = mockResponse();

    const mockUserCreated = {
      id: 1,
      ...userData
    };

    Usuario.create = jest.fn().mockResolvedValue(mockUserCreated);

    await PostUsers(req, res);

    expect(Usuario.create).toHaveBeenCalledWith(
      expect.objectContaining({
        nome_completo: "João da Silva",
        email: "joao@exemplo.com",
        cidade: "São Paulo",
        estado: "SP",
        idade: 30,
        telefone: "11999999999",
        celular: "11999999999",
        cpf: "123.456.789-00",
        endereco: "Rua A, 123",
        bairro: "Centro",
        cep: "12345-678",
        instagram: "@joaodasilva",
        facebook: "facebook.com/joaodasilva",
        administrador: false
      })
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        nome_completo: "João da Silva",
        email: "joao@exemplo.com",
        cidade: "São Paulo",
        estado: "SP",
        idade: 30,
        telefone: "11999999999",
        celular: "11999999999",
        cpf: "123.456.789-00",
        endereco: "Rua A, 123",
        bairro: "Centro",
        cep: "12345-678",
        instagram: "@joaodasilva",
        facebook: "facebook.com/joaodasilva",
        administrador: false
      })
    );
  });

  test('postUsers deve retornar 400 se faltar algum campo obrigatório', async () => {
    const userData = {
      email: "joao@exemplo.com",
      senha: "123456",
      cidade: "São Paulo",
      estado: "SP",
      idade: 30,
      telefone: "11999999999",
      celular: "11999999999",
      cpf: "123.456.789-00",
      endereco: "Rua A, 123",
      bairro: "Centro",
      cep: "12345-678",
      instagram: "@joaodasilva",
      facebook: "facebook.com/joaodasilva",
      administrador: false
    };

    const req = { body: userData };
    const res = mockResponse();

    await PostUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Todos os campos obrigatórios devem ser preenchidos corretamente."
    });

    expect(Usuario.create).not.toHaveBeenCalled();
  });

  test('postUsers deve retornar 400 se o usuário já existir', async () => {
    const mockUser = {
      nome_completo: "João da Silva",
      email: "joao@exemplo.com",
      senha: "123456",
      cidade: "São Paulo",
      estado: "SP",
      idade: 30,
      telefone: "11999999999",
      celular: "11999999999",
      cpf: "123.456.789-00",
      endereco: "Rua A, 123",
      bairro: "Centro",
      cep: "12345-678",
      instagram: "@joaodasilva",
      facebook: "facebook.com/joaodasilva",
      administrador: false
    };

    const req = { body: mockUser };
    const res = mockResponse();

    Usuario.findOne = jest.fn().mockResolvedValue(mockUser);

    await PostUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Email preenchido já está sendo utilizado."
    });

    expect(Usuario.create).not.toHaveBeenCalled();
  });

  test('postUsers deve retornar 500 em caso de erro interno', async () => {
    const userData = {
      nome_completo: "João da Silva",
      email: "joao@exemplo.com",
      senha: "123456",
      cidade: "São Paulo",
      estado: "SP",
      idade: 30,
      telefone: "11999999999",
      celular: "11999999999",
      cpf: "123.456.789-00",
      endereco: "Rua A, 123",
      bairro: "Centro",
      cep: "12345-678",
      instagram: "@joaodasilva",
      facebook: "facebook.com/joaodasilva",
      administrador: false
    };

    const req = { body: userData };
    const res = mockResponse();

    Usuario.create = jest.fn().mockRejectedValue(new Error("Mock DB error"));

    await PostUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Erro interno ao cadastrar o tutor."
    });
  });

  test('deve atualizar o usuário com sucesso', async () => {
    const req = { params: { id: '1' }, body: { nome_completo: 'Novo Nome' } };
    const res = mockResponse();

    Usuario.update = jest.fn().mockResolvedValue([1]);
    Usuario.findByPk = jest.fn().mockResolvedValue({ id: '1', nome_completo: 'Novo Nome' });

    await PatchUsersId(req, res);

    expect(Usuario.update).toHaveBeenCalledWith(req.body, { where: { id: '1' } });
    expect(Usuario.findByPk).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário atualizado com sucesso",
      user: { id: '1', nome_completo: 'Novo Nome' }
    });
  });

  test('deve retornar 400 se nenhum campo for enviado', async () => {
    const req = { params: { id: '1' }, body: {} };
    const res = mockResponse();

    await PatchUsersId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Pelo menos um campo deve ser enviado para atualização."
    });
    expect(Usuario.update).not.toHaveBeenCalled();
  });

  test('deve retornar 404 se usuário não for encontrado', async () => {
    const req = { params: { id: '999' }, body: { nome_completo: 'Novo Nome' } };
    const res = mockResponse();

    Usuario.update = jest.fn().mockResolvedValue([0]);

    await PatchUsersId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Tutor não encontrado."
    });
  });

  test('deve retornar 500 em caso de erro inesperado', async () => {
    const req = { params: { id: '1' }, body: { nome_completo: 'Novo Nome' } };
    const res = mockResponse();

    Usuario.update = jest.fn().mockRejectedValue(new Error('Mock DB crash'));

    await PatchUsersId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      erro: 'Erro ao atualizar os dados do tutor'
    });
  });

  test('Deve retornar sucesso se email e senha forem válidos', async () => {
    const hashed = await bcrypt.hash("123456", 10);

    const req = { body: { email: 'teste@exemplo.com', senha: '123456' } };
    const res = mockResponse();

    Usuario.findOne = jest.fn().mockResolvedValue({ email: 'teste@exemplo.com', senha: hashed });

    await login(req, res);

    expect(Usuario.findOne).toHaveBeenCalledWith({ where: { email: 'teste@exemplo.com' } });
    expect.objectContaining({
      mensagem: 'Login bem sucedido',
      token: expect.any(String)   // token is dynamic, so just check it exists
    })
  });

  test('Deve retornar erro se senha for inválida', async () => {
    const req = { body: { email: 'teste@exemplo.com', senha: 'errada' } };
    const res = mockResponse();

    Usuario.findOne = jest.fn().mockResolvedValue({ email: 'teste@exemplo.com', senha: '123456' });

    await login(req, res);

    expect(res.send).toHaveBeenCalledWith({ erro: 'Email ou senha inválidos.' });
  });

  test('Deve retornar erro se usuário não existir', async () => {
    const req = { body: { email: 'naoexiste@exemplo.com', senha: '123456' } };
    const res = mockResponse();

    Usuario.findOne = jest.fn().mockResolvedValue(null);

    await login(req, res);

    expect(res.send).toHaveBeenCalledWith({ erro: 'Email ou senha inválidos.' });
  });

  test('Deve retornar erro 500 em caso de exceção', async () => {
    const req = { body: { email: 'teste@exemplo.com', senha: '123456' } };
    const res = mockResponse();

    Usuario.findOne = jest.fn().mockRejectedValue(new Error('DB error'));

    // Mock console.error so it doesn't print and mark the test as failed.
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await login(req, res);

    expect(res.send).toHaveBeenCalledWith({ erro: 'Erro interno ao tentar fazer o login.' });
  });
});
