function ReviewCard({ title, comment }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{comment}</p>
    </div>
  );
}

export default ReviewCard;
