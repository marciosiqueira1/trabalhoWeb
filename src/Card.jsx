import React from 'react'

function Card({id, nome, img, capital, continente, area, mapaUrl, lang, onDelete}) {

  const areaConv = area.toLocaleString('pt-BR'); // Colocar o . no valor (123456 para 123.456)

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
          <span><strong>{areaConv + " km²"}</strong></span>
        </div>
        <hr />
        <div id='div1'>
          <span>Linguas:</span>
          <span><strong>{lang}</strong></span>
        </div>
        <div id='btn-card'>
          <button id='edit-btn'>
            <img src="public\images\edit.png" alt="" id='icon-edit-png' />Editar
          </button>
          <button 
            id='del-btn' 
            onClick={() => {
              const confirma = window.confirm("Tem certeza que deseja excluir o card?");
              if (confirma) {
                onDelete(id);
              }
            }}>
            <img src="public\images\icondel.png" alt="" id='icon-del-png' />Deletar
          </button>
        </div>
      </div>

      <div id='div-mapa'>
        <div>
          <img src={mapaUrl} alt="Localização do pais" id='img-mapa'/>
        </div>
      </div>

    </div>
  )
}

export default Card


// Card Simples

// import React from 'react'

// function Card({key, nome, img}) {
//   return (
//     <div id='card'>
//         <img src={img} id='flag-img'/>
//         <h2><a href="">{nome}</a></h2>
//     </div>
//   )
// }

// export default Card