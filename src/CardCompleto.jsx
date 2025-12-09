import { useState } from "react";

function CardCompleto({
  id,
  nome,
  img,
  capital,
  continente,
  area,
  mapaUrl,
  lang,
  onDelete,
  onEdit
}) {
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    nome,
    capital,
    continente,
    area,
    lang
  });

  const alterarForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const salvar = () => {
    onEdit(id, form);
    setEditMode(false);
  };

  const cancelar = () => {
    setForm({ nome, capital, continente, area, lang });
    setEditMode(false);
  };

  return (
    <div id='card-completo'>
      <div id='div-infos'>
        <img src={img} id='flag-img' alt="Bandeira do país" />
        
        <h2 id='nome-pais'>{nome}</h2>
        
        <div id='div1'>
          <span>Capital:</span>
          {editMode ? (
            <input
              type="text"
              name="capital"
              value={form.capital}
              onChange={alterarForm}
              className="input-editar"
            />
          ) : (
            <span><strong>{capital}</strong></span>
          )}
        </div>

        <hr />

        {/* CONTINENTE */}
        <div id='div1'>
          <span>Continente:</span>
          {editMode ? (
            <input
              type="text"
              name="continente"
              value={form.continente}
              onChange={alterarForm}
              className="input-editar"
            />
          ) : (
            <span><strong>{continente}</strong></span>
          )}
        </div>

        <hr />

        {/* ÁREA */}
        <div id='div1'>
          <span>Área:</span>
          {editMode ? (
            <input
              type="number"
              name="area"
              value={form.area}
              onChange={alterarForm}
              className="input-editar"
            />
          ) : (
            <span><strong>{area.toLocaleString('pt-BR')} km²</strong></span> //muda de 123456 para 123.456
          )}
        </div>

        <hr />

        <div id='div1'>
          <span>Línguas:</span>
          {editMode ? (
            <input
              type="text"
              name="lang"
              value={form.lang}
              onChange={alterarForm}
              className="input-editar"
            />
          ) : (
            <span><strong>{lang}</strong></span>
          )}
        </div>

        <div id='btn-card'>
          {!editMode ? (
            <>
              <button id='edit-btn' onClick={() => setEditMode(true)}>
                <img src="public/images/edit.png" id='icon-edit-png' />Editar
              </button>

              <button
                id='del-btn'
                onClick={() => {
                  if (confirm("Tem certeza que deseja excluir?")) {
                    onDelete(id);
                  }
                }}
              >
                <img src="public/images/icondel.png" id='icon-del-png' />Deletar
              </button>
            </>
          ) : (
            <div>
              <button id='salvar-btn' onClick={salvar}>Salvar</button>
              <button id='cancel-btn' onClick={cancelar}>Cancelar</button>
            </div>
          )}
        </div>
      </div>

      <div id='div-mapa'>
        <img src={mapaUrl} alt="Mapa" id='img-mapa' />
      </div>
    </div>
  );
}

export default CardCompleto;
