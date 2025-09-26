import { describe, jest, test, afterEach } from '@jest/globals';
import { donation } from "../../controllers/doacoes.controller.js";
import Doacao from "../../models/Doacao.js";
import QRCode from "qrcode";

// Mock manual do qrcode-pix
jest.mock("qrcode-pix", () => ({
  QrCodePix: jest.fn(() => ({
    payload: jest.fn().mockReturnValue("payload-qrcode")
  }))
}));

jest.mock("qrcode");
jest.mock("../../models/Doacao.js");

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("Testes do donation controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve processar uma doação com sucesso", async () => {
    const req = {
      body: { nome: "Sara", email: "sara@email.com", valor: 50, mensagem: "Parabéns pelo projeto!" }
    };
    const res = mockResponse();

    QRCode.toDataURL = jest.fn().mockResolvedValue("data:image/png;base64,QR_CODE_IMAGE");

    Doacao.create = jest.fn().mockResolvedValue({
      id: 1,
      nome: "Sara",
      valor: 50,
      mensagem: "Parabéns pelo projeto!",
      linkPix: "payload-qrcode"
    });

    await donation(req, res);

    expect(QRCode.toDataURL).toHaveBeenCalledWith(expect.any(String));
    expect(Doacao.create).toHaveBeenCalledWith({
      nome: "Sara",
      email: "sara@email.com",
      valor: 50,
      mensagem: "Parabéns pelo projeto!",
      linkPix: expect.any(String)
    });
    expect(res.send).toHaveBeenCalledWith({
      doação_id: 1,
      nome: "Sara",
      valor: 50,
      mensagem: "Parabéns pelo projeto!",
      linkPix: expect.any(String),
      qrcode: "data:image/png;base64,QR_CODE_IMAGE"
    });
  });
});
