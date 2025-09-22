import { FaSearch } from "react-icons/fa";
import "./Header.css";

export function Header({ onSearch }) {
  return (
    <header className="header">
      <h1 className="title">Products</h1>

      <div className="search-field">
        <FaSearch className="search-field__icon" />
        <input
          type="text"
          className="search-field__input"
          placeholder="Пошук"
          onChange={onSearch}
        />
      </div>
    </header>
  );
}
