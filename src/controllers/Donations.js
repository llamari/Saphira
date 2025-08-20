import { QrCodePix } from "qrcode-pix";
import QRCode from 'qrcode';

export const donation = async (req, res) => {
    const {nome, email, valor, mensagem} = req.body;

    const dadosPix = {
        version: '01',
        key: 'saralamarisilva@gmail.com',
        name: 'Sara Lamari Silva',
        city: 'Campinas',
        value: valor,
        description: mensagem
    };

    const qrCodePix = QrCodePix(dadosPix);
    const payload = qrCodePix.payload();

    try {
        const qrCodeImage = await QRCode.toDataURL(payload);
        console.log(qrCodeImage);
        res.send({qrCodeImage});
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        return null;
    }
}