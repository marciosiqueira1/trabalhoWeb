import { useState } from "react";
import axios from "axios";
import './styles/Login.css'

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("http://localhost:3001/login", {
        email,
        senha
      });

      // token retornado
      const token = resp.data.token;

      // salva token no navegador
      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");

      onLogin(); // avisa o App

    } catch (erro) {
      alert(erro.response?.data?.erro || "Erro ao fazer login");
    }
  }

  return (
    <form onSubmit={handleSubmit} id="form-login">
      <h2 id="h2-login">Login</h2>

      <input
        id="input-login"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        id="input-login"
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button>Entrar</button>
    </form>
  );
}
    
export default Login;
