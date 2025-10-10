//LABURA CON HOME.JSX

function AlbumCard({ image, title }) {
  return (
    <div className="album">
      <img src={image} alt={title} />
      <div className="album-title">{title}</div>
    </div>
  );
}

export default AlbumCard;
