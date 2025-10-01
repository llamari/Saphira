import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ erro: "Nenhum token fornecido, autorização inválida" });
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ erro: "Token inválido" });
      req.user = user;
      next();
    });
}

export function authenticate_admin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ erro: "Nenhum token fornecido, autorização inválida" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ erro: "Token inválido" });

    const decoded_payload = jwt.decode(token);
    const isAdmin = decoded_payload.admin;
    
    if (!isAdmin) {
      return res.status(403).json({ erro: "Acesso não autorizado."})
    }

    req.user = user;
    next();
  });
}