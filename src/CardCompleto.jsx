import React from 'react';

function CardCompleto({ id, nome, img, capital, continente, area, mapaUrl, lang, onDelete }) {
  const areaConv = area.toLocaleString('pt-BR');

  return (
    <div id='card-completo'>
      <div id='div-infos'>
        <img src={img} id='flag-img' alt="Bandeira do país" />
        <h2 id='nome-pais'>{nome}</h2>

        <div id='div1'>
          <span>Capital:</span>
          <span><strong>{capital}</strong></span>
        </div>
        <hr />

        <div id='div1'>
          <span>Continente:</span>
          <span><strong>{continente}</strong></span>
        </div>
        <hr />

        <div id='div1'>
          <span>Área:</span>
          <span><strong>{areaConv} km²</strong></span>
        </div>
        <hr />

        <div id='div1'>
          <span>Línguas:</span>
          <span><strong>{lang}</strong></span>
        </div>

        <div id='btn-card'>
          <button id='edit-btn'>
            <img src="public/images/edit.png" id='icon-edit-png' />Editar
          </button>

          <button
            id='del-btn'
            onClick={() => {
              const confirma = window.confirm("Tem certeza que deseja excluir o card?");
              if (confirma) onDelete(id);
            }}>
            <img src="public/images/icondel.png" id='icon-del-png' />Deletar
          </button>
        </div>
      </div>

      <div id='div-mapa'>
        <img src={mapaUrl} alt="Localização do país" id='img-mapa' />
      </div>
    </div>
  );
}

export default CardCompleto;
