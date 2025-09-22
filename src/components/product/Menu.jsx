import "./Menu.css";

export function Menu({onPlus, onMinus, onDelete}) {
    return (
        <div className="product__more-action-menu">
            <div className="operations-container">
                <div className="operation plus" onClick={onPlus}>+</div>
                <div className="operation minus" onClick={onMinus}>-</div>
            </div>
            <button className="product__delete-button" onClick={onDelete}>Delete</button>
        </div>
    );
}