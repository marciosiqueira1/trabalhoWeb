import { use, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import './styles/header.css';
import './styles/cards.css';
import endPoints from './endpoints.json';

function App() {
  const apiNome = "https://restcountries.com/v3.1/name";

  const [listaPaises, setListaPaises] = useState([]);
  const [valorInput, setValorInput] = useState('');

  const buscaNome = async (valorInput) => {
    try{

      const input = valorInput.trim();

      const endPoint = await axios.get(`${apiNome}/${input}`); //restcountries.com/v3.1/name/germany

      const dadosPais = endPoint.data[0];

      const pais = {
        nome: dadosPais.name.common,  // Germany
        img: dadosPais.flags.png,    //  Flag
        // capital: dadosPais.capital, //   Berlin
        // continente: dadosPais.region,
        // regiao: dadosPais.subregion,
        // currency: dadosPais.capital
      }

      setListaPaises(prevLista => [pais, ...prevLista]); 
    }
    
    catch(error){
        console.log ('Deu erro!');
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      buscaNome(valorInput);
    }

  //Busca Random

  const apiNomeRandom = "https://restcountries.com/v3.1/name";

  const listaCodigos = endPoints.codigos;

  // const buscaPais = async () => {
  //   const random = Math.floor(Math.random() * listaCodigos.length); 
  //   const valorEscolhido = listaCodigos[random]; 
  //   try {
  //     const dados = await axios.get(`${apiNomeRandom}/${valorEscolhido}`);
  //     const dadosPais = dados.data[0];
  //     const pais = {
  //       nome: dadosPais.name.common,
  //       img: dadosPais.flags.png,
  //       // capital: dadosPais.capital,
  //     };

  //     setListaPaises(prevLista => [pais, ...prevLista]); 

  //   } catch (error) {
  //       console.error(`Erro ao buscar país ${valorEscolhido}:`, error);
  //   }
  // }

  const buscaPais = async () => {
        // 1. Sorteia um código (Ex: 'BRA')
        const random = Math.floor(Math.random() * listaCodigos.length); 
        const codigoEscolhido = listaCodigos[random]; 

        try {
            // 2. Busca os dados do país usando o endpoint Alpha (mais rápido)
            const dados = await axios.get(`${apiAlpha}/${codigoEscolhido}`);
            const nomeCompleto = dados.data[0].name.common;
            
            // 3. ATUALIZA O ESTADO DO INPUT COM O NOME COMPLETO
            setValorInput(nomeCompleto); 

        } catch (error) {
            console.error(`Erro ao buscar nome para preenchimento:`, error);
        }
    };


  useEffect(() => {
    buscaPais();
  }, []);

return (
    <>
      <header>
        <h1>
          <img src="public\images\logoFlagpedia.png" alt="" id='logo'/>
        </h1>
        <nav>
          <div id='div-btn-2'>
            <button id='btn-inicio'>Inicio</button>
            <button id='btn-sobre'>Sobre</button>
          </div>
            <button id='btn-logout'>LogOut</button>
        </nav>
      </header>
      <main>
        <h2 id='pesquisa-h2'>Pesquise um país aleatório...</h2>
        <form onSubmit={handleSubmit}>
          <div id='div-input-btn'>
            <button onClick={buscaPais} id='btn-busca-random'>?</button> 
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
                currency={cardData.currency}
              />
            ))
          ) : (
            <p></p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;