import './EmptyListMessage.css';

export function EmptyListMessage() {
  return (
    <div className="empty-list-message">
      <img
        src="/empty-list-image.png"
        alt="No products"
        className="empty-list-image"
      />
      <p className="empty-list-text">Додай чогось смачненького ↘</p>
    </div>
  );
}
