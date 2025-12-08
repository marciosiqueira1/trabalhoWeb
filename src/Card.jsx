function Card({ id, nome, img, onOpen }) {
  return (
    <div id='card'>
      <img src={img} id='flag-img' />
      <h2 id="h2-nome-pais">
        <a href="#" onClick={(e) => { e.preventDefault(); onOpen(); }}>
          {nome}
        </a>
      </h2>
    </div>
  );
}

export default Card;
