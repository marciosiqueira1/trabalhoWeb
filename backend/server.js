const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

const USUARIO = {
  email: "admin@gmail.com",
  senha: "1234",
};

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (email !== USUARIO.email || senha !== USUARIO.senha) {
    return res.status(400).json({ erro: "Credenciais inválidas" });
  }

  return res.json({ msg: "Login OK" });
});

app.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
  