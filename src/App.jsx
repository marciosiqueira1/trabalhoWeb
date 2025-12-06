import { useEffect, useState } from 'react';
import './styles/header.css';
import './styles/cards.css';
import Card from './Card';
import axios from 'axios';
import endPoints from './endpoints.json';

function App() {

  const apiNome = "https://restcountries.com/v3.1";
  const tokenApi = "sk.eyJ1IjoibWFyY2lvc2xyIiwiYSI6ImNtaXVsamdtODB2dm4zZG9tcTJqanJ0YzQifQ.aCIQ-PZRXgRqmchp7SlbTQ";

  const [listaPaises, setListaPaises] = useState([]);
  const [valorInput, setValorInput] = useState('');

  const listaCodigos = endPoints.codigos;

  // --- FUNÇÃO 1: BUSCA POR NOME E ADICIONA O CARD (ACESSADA APENAS PELO SUBMIT) ---
  const buscaNome = async (valorInput) => {
    const input = valorInput.trim();


    try {

      const urlRestrita = `${apiNome}/name/${input}?fullText=true`; // Restringe a pesquisa apenas aos endpoints presentes na API
      const endPoint = await axios.get (urlRestrita);
      const dadosPais = endPoint.data[0];

      // API do mapa precisa da Latitude e Longitude para mostrar a localização no mapa

      const lat = dadosPais.latlng[0];
      const lng = dadosPais.latlng[1];
      const urlMapa = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},4,0/400x400?access_token=${tokenApi}`;
      //                                                                                             /\ /\
      //                                                                                         dimensões do mapa
      const pais = {
        id: dadosPais.cca3,
        nome: dadosPais.name.common,
        img: dadosPais.flags.png,
        capital: dadosPais.capital ? dadosPais.capital[0] : 'N/A',
        continente: dadosPais.region,
        regiao: dadosPais.subregion,
        url: urlMapa
      };

      setListaPaises(prevLista => [pais, ...prevLista]);
      setValorInput('');

    } catch (error) {
      alert(`País '${input}' não encontrado!`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    buscaNome(valorInput);
  }

  // --- FUNÇÃO 2: PREENCHE O INPUT COM UM NOME ALEATÓRIO ---
  const preencheInputAleatorio = async () => {
    // 1. Geração Aleatória do Código
    const random = Math.floor(Math.random() * listaCodigos.length);
    const codigoEscolhido = listaCodigos[random];

      // 2. Busca os dados para obter o NOME (usando API_ALPHA, mais rápido para códigos)
      const dados = await axios.get(`${apiNome}/alpha/${codigoEscolhido}`);
      const nomeCompleto = dados.data[0].name.common;

      // 3. ATUALIZA O ESTADO DO INPUT (CORREÇÃO CHAVE)
      setValorInput(nomeCompleto);
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <header>
        <h1>
          <img src="public\images\logoFlagpedia.png" alt="" id='logo'/>
        </h1>
        <nav>
          <div id='div-btn-2'>
            <button id='btn-inicio' onClick={() => setPaginaAtual ('inicio')}>Inicio</button>
            <button id='btn-sobre' onClick={() => setPaginaAtual ('sobre')}>Sobre</button>
          </div>
            <button id='btn-logout'>LogOut</button>
        </nav> 
      </header>
      <main>
        <h2 id='pesquisa-h2'>Pesquise um país ou use o botão '?' para uma sugestão!</h2>
        <form onSubmit={handleSubmit}>
          <div id='div-input-btn'>
            <button type='button' onClick={preencheInputAleatorio} id='btn-busca-random'>?</button>
            <input type="text"
              placeholder='nome do país em inglês'
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
            />
            <button type='submit' id='btn-busca'>Buscar</button>
          </div>
        </form>

        <div id='div-card'>
          {listaPaises.length > 0 ? (
            listaPaises.map((cardData) => (
              <Card
                key={cardData.id}
                nome={cardData.nome}
                img={cardData.img}
                capital={cardData.capital}
                continente={cardData.continente}
                regiao={cardData.regiao}
                mapaUrl={cardData.url}
              />
            ))
          ) : (
            <p>Use a busca acima para adicionar países.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;