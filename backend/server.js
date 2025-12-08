const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

// Caminho para o arquivo
const usersFile = path.join(__dirname, 'data', 'users.json');

app.post('/register', (req, res) => {
    const { email, senha, confirmacao } = req.body;

    // valida campos
    if (!email || !senha || !confirmacao) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    // valida email
    if (!email.includes('@')) {
        return res.status(400).json({ erro: "Email inválido" });
    }

    // valida senha
    if (senha.length < 4) {
        return res.status(400).json({ erro: "Senha deve ter no mínimo 4 caracteres" });
    }

    // valida confirmação
    if (senha !== confirmacao) {
        return res.status(400).json({ erro: "As senhas não coincidem" });
    }

    // lê arquivo
    const users = JSON.parse(fs.readFileSync(usersFile));

    // verifica email
    const existe = users.find(u => u.email === email);
    if (existe) {
        return res.status(400).json({ erro: "E-mail já cadastrado" });
    }

    const bcrypt = require('bcrypt');

    users.push({
        email,
        senha: bcrypt.hashSync(senha, 10)
    });

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return res.json({ msg: "Cadastro realizado com sucesso!" });
});

const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ erro: "Usuário não encontrado" });
  }

  // compara senha
  const senhaOk = bcrypt.compareSync(senha, user.senha);

  if (!senhaOk) {
    return res.status(400).json({ erro: "Senha incorreta" });
  }

  // gera token
  const token = jwt.sign(
    { email: user.email },
    "SEGREDO_SUPER_SECRETO",
    { expiresIn: "2h" }
  );

  return res.json({ msg: "Login realizado com sucesso!", token });
});

// Middleware para verificar token
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization']; // pega o header
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ erro: "Token não encontrado" });
  }

  jwt.verify(token, "SEGREDO_SUPER_SECRETO", (err, user) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" });
    }

    req.user = user; // guarda o usuário para usar depois
    next(); // segue para a rota
  });
}

app.get('/rota-protegida', autenticarToken, (req, res) => {
  res.json({ msg: "Você acessou uma rota protegida!", usuario: req.user });
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
