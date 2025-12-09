import { useState } from 'react';
import './styles/header.css';
import './styles/cards.css';
import Card from './Card';
import CardCompleto from './CardCompleto';
import axios from 'axios';
import endPoints from './endpoints.json';
import Login from './Login';

function App() {

  const apiNome = "https://restcountries.com/v3.1";
  const tokenApi = "pk.eyJ1IjoibWFyY2lvc2xyIiwiYSI6ImNtaXhpNWh3bTA0Y2wzZnB2YnhxbnF3dm4ifQ.mbkuut1Ftwf8bLXQLtIaZA";

  const [logado, setLogado] = useState(false);

  const [listaPaises, setListaPaises] = useState([]);
  const [valorInput, setValorInput] = useState('');
  const [paginaAtual, setPaginaAtual] = useState('inicio'); 
  const [paisSelecionado, setPaisSelecionado] = useState(null);
  const listaCodigos = endPoints.codigos;

  const buscaNome = async (valorInput) => {
    const input = valorInput.trim();
    try {
      const urlRestrita = `${apiNome}/name/${input}?fullText=true`;
      const endPoint = await axios.get(urlRestrita);
      const dadosPais = endPoint.data[0];

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
        mapaUrl: urlMapa,
        lang: Object.values(dadosPais.languages).join(', ')
      };

      setListaPaises(prevLista => [pais, ...prevLista]);
      setValorInput('');
      // quando adiciona novo país, navega opcionalmente para inicio (mantemos na lista)
      setPaginaAtual('inicio');
      setPaisSelecionado(null);
    } catch (error) {
      alert(`País '${input}' não encontrado!`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscaNome(valorInput);
  };

  const preencheInputAleatorio = async () => {
    const random = Math.floor(Math.random() * listaCodigos.length);
    const codigoEscolhido = listaCodigos[random];

    const dados = await axios.get(`${apiNome}/alpha/${codigoEscolhido}`);
    const nomeCompleto = dados.data[0].name.common;

    setValorInput(nomeCompleto);
  };

  const editarPais = (id, novo) => {
    setListaPaises(prev =>
      prev.map(p => p.id === id ? { ...p, ...novo } : p)
    );
  };


  const deleteCard = (id) => {
    setListaPaises(prev => prev.filter(p => p.id !== id));
    // se o card aberto for deletado na tela de detalhe, volta para inicio
    if (paisSelecionado === id) {
      setPaisSelecionado(null);
      setPaginaAtual('inicio');
    }
  };

  // chamada quando o usuário clica no Card simples:
  const abrirDetalhe = (id) => {
    setPaisSelecionado(id);
    setPaginaAtual('detalhe');
  };

  const dadosPaisSelecionado = listaPaises.find(p => p.id === paisSelecionado);

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <>
      <header>
        <h1>
          <img src="public/images/logoFlagpedia.png" alt="logo" id='logo' />
        </h1>
        <nav>
          <div id='div-btn-2'>
            <button id='btn-inicio' onClick={() => { setPaginaAtual('inicio'); setPaisSelecionado(null); }}>Inicio</button>
            <button id='btn-sobre' onClick={() => setPaginaAtual('sobre')}>Sobre</button>
          </div>
          <button 
            id='btn-logout'
            onClick={() => {
              localStorage.removeItem("token");
              setLogado(false);
            }}>
              LogOut     
            </button>
        </nav>
      </header>

      <main>
        {paginaAtual === 'inicio' && (
          <>
            <h2 id='pesquisa-h2'>Pesquise um país ou use o botão '?' para uma sugestão!</h2>

            <form onSubmit={handleSubmit}>
              <div id='div-input-btn'>
                <button type='button' onClick={preencheInputAleatorio} id='btn-busca-random'>?</button>
                <input
                  type="text"
                  placeholder='nome do país em inglês'
                  value={valorInput}
                  onChange={(e) => setValorInput(e.target.value)}
                />
                <button type='submit' id='btn-busca'>Buscar</button>
              </div>
            </form>

            {/* LISTA DE CARDS SIMPLES */}
            <div id='div-card'>
              {listaPaises.length > 0 ? (
                listaPaises.map(p => (
                  <Card
                    key={p.id}
                    id={p.id}
                    nome={p.nome}
                    img={p.img}
                    onOpen={() => abrirDetalhe(p.id)}
                  />
                ))
              ) : (
                <p>Use a busca acima para adicionar países.</p>
              )}
            </div>
          </>
        )}

        {paginaAtual === 'sobre' && (
          <div id='div-sobre'>
            <section id='card-sobre'>
              <p id='texto-sobre'><strong>Sobre:</strong><br /><br />Desde pequeno, sempre fui aquela criança obcecada por geografia: vivia olhando mapas, decorando capitais e bandeiras, e transformando cada país em uma nova curiosidade para descobrir.
              Com o tempo, essa paixão nunca passou. Sempre gostei de entender como cada país tem sua própria história, cultura e identidade visual. Bandeiras, fronteiras, idiomas… tudo isso sempre me chamou atenção.
              A ideia aqui é simples: juntar o que eu gosto com algo que estou aprendendo. Criar uma ferramenta onde eu posso pesquisar países, visualizar suas informações e explorar mapas! <br/><br/>
              Feito com ❤️ por <a href="https://github.com/marciosiqueira1">Márcio</a> 
              </p>
              <img src="/images/fotoeu.jpeg" alt="FotoEu" id='foto-eu'/>
            </section>
          </div>
        )}

        {paginaAtual === 'detalhe' && dadosPaisSelecionado && (
            <div id='container-card-completo'>
              <CardCompleto
                id={dadosPaisSelecionado.id}
                nome={dadosPaisSelecionado.nome}
                img={dadosPaisSelecionado.img}
                capital={dadosPaisSelecionado.capital}
                continente={dadosPaisSelecionado.continente}
                area={dadosPaisSelecionado.area}
                mapaUrl={dadosPaisSelecionado.mapaUrl}
                lang={dadosPaisSelecionado.lang}
                onEdit={editarPais}
                onDelete={deleteCard}
              />
            </div>
        )}

        {paginaAtual === 'detalhe' && !dadosPaisSelecionado && (
          <section style={{ padding: 20 }}>
            <p>País não encontrado. Volte para a lista.</p>
            <button onClick={() => setPaginaAtual('inicio')}>Voltar</button>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
