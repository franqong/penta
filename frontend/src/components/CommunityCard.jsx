function CommunityCard({ name, description }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default CommunityCard;