import { useState } from "react";
import "./styles/login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    onLogin();
  };

  return (
    <div id="login-container">
      <form id="form-login" onSubmit={fazerLogin}>

        <h2 id="h2-login">Login</h2>

        <input
          className="input-login"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="input-login"
        />

        <input
          className="input-login"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          id="input-login"
        />

        <button id="btn-login" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
