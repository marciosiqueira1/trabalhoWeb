import { useEffect, useState } from 'react';
import './styles/header.css';
import './styles/cards.css';
import Login from './Login';
import Card from './Card';
import axios from 'axios';
import endPoints from './endpoints.json';

function App() {
  const [logado, setLogado] = useState(false)  // ok

  useEffect(() => {
  }, [])

  const apiNome = "https://restcountries.com/v3.1";
  const tokenApi = "sk.eyJ1IjoibWFyY2lvc2xyIiwiYSI6ImNtaXVsamdtODB2dm4zZG9tcTJqanJ0YzQifQ.aCIQ-PZRXgRqmchp7SlbTQ";

  const [listaPaises, setListaPaises] = useState([]);
  const [valorInput, setValorInput] = useState('');

  const listaCodigos = endPoints.codigos;

  const buscaNome = async (valorInput) => {
    const input = valorInput.trim();

    try {

      const urlRestrita = `${apiNome}/name/${input}?fullText=true`; // Restringe a pesquisa apenas aos endpoints presentes na API
      const endPoint = await axios.get(urlRestrita);
      const dadosPais = endPoint.data[0];

      // API do mapa precisa da Latitude e Longitude para mostrar a localização no mapa

      const lat = dadosPais.latlng[0];
      const lng = dadosPais.latlng[1];

      const tamPais = dadosPais.area;
      let zoom;

      // Zoom muda conforme o tamanho do país

      if (tamPais <= 50000) {
        zoom = '6,0';
      } else if (tamPais <= 200000) {
        zoom = '5,0';
      } else if (tamPais <= 500000) {
        zoom = '4,0';
      } else if (tamPais <= 2000000) {
        zoom = '3,0';
      } else if (tamPais <= 10000000) {
        zoom = '2,0';
      } else {
        zoom = '1.5,0';
      }

      const urlMapa = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${lng},${lat},${zoom}/400x400?access_token=${tokenApi}`;

      const pais = {
        id: dadosPais.cca3,
        nome: dadosPais.name.common,
        img: dadosPais.flags.png,
        capital: dadosPais.capital,
        continente: dadosPais.region,
        area: dadosPais.area,
        url: urlMapa,
        lang: Object.values(dadosPais.languages).join(', ') // Transforma em string e coloca a , 
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

  const preencheInputAleatorio = async () => {

    const random = Math.floor(Math.random() * listaCodigos.length);
    const codigoEscolhido = listaCodigos[random];

    const dados = await axios.get(`${apiNome}/alpha/${codigoEscolhido}`);
    const nomeCompleto = dados.data[0].name.common;

    setValorInput(nomeCompleto);
  }

  const deleteCard = (id) => {
    setListaPaises(prev => prev.filter(p => p.id !== id));
  };

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <>
      <header>
        <h1>
          <img src="public\images\logoFlagpedia.png" alt="" id='logo' />
        </h1>
        <nav>
          <div id='div-btn-2'>
            <button id='btn-inicio' onClick={() => setPaginaAtual('inicio')}>Inicio</button>
            <button id='btn-sobre' onClick={() => setPaginaAtual('sobre')}>Sobre</button>
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
                id={cardData.id}
                nome={cardData.nome}
                img={cardData.img}
                capital={cardData.capital}
                continente={cardData.continente}
                area={cardData.area}
                mapaUrl={cardData.url}
                lang={cardData.lang}
                onDelete={deleteCard}
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


// Teste para ver se deu bom