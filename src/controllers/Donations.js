import { QrCodePix } from "qrcode-pix";
import QRCode from 'qrcode';
import Doacao from "../models/Doacao.js";

export const donation = async (req, res) => {
    const { nome, email, valor, mensagem } = req.body;

    if (!nome || !email || !valor || valor<=0 || !mensagem) {
        return res.send({"erro": "Valor da doação é obrigatório e deve ser um número positivo"})
    }

    const dadosPix = {
        version: '01',
        key: 'saralamarisilva@gmail.com',
        name: 'Sara Lamari Silva',
        city: 'Campinas',
        value: valor,
        message: mensagem
    };

    const qrCodePix = QrCodePix(dadosPix);
    const payload = qrCodePix.payload();

    try {
        const qrCodeImage = await QRCode.toDataURL(payload);
        const donation = await Doacao.create({
            nome,
            email,
            valor,
            mensagem: mensagem,
            linkPix: payload
        })

        res.send({
            "doação_id": donation.id,
            "nome": donation.nome,
            "valor": donation.valor,
            "mensagem": donation.mensagem,
            "linkPix": donation.linkPix,
            "qrcode": qrCodeImage
        });
    } catch (error) {
        return res.send({"erro": "Erro ao processar a doação"});
    }
}