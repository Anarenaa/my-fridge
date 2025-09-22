import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Menu } from "./Menu";
import "./Product.css";

export function Product({ name, unit, grams, onUpdate, onDelete }) {
  const [menuShow, setMenuShow] = useState(false);
  const menuRef = useRef(null);

  //Handle click outside to close menu instead of only on the icon
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuShow(false);
      }
    }

    // Add click listener when menu is shown
    if (menuShow) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuShow]);

  function handlePlus() {
    if (unit) {
      onUpdate({
        unit: Number(unit) + 1 //number to ensure it's a number
      });
    } else {
      onUpdate({
        grams: Number(grams) + 50
      });
    }
  }

  function handleMinus() {
    if (unit) {
      if (unit > 1) {
        onUpdate({
          unit: Number(unit) - 1
        });
      } else {
        onDelete();
      }
    } else if (grams > 50) {
      onUpdate({
        grams: Number(grams) - 50
      });
    } else {
      onDelete();
    }
  }

  return (
    <div className="product">
      <h2 className="product__name ellipsis">{name}</h2>
      <p className="product__amount">{unit ? `${unit} шт` : `${grams} г`}</p>
      <FaEllipsisV
        className="product__more-action-icon icon"
        onClick={(e) => {
          e.stopPropagation();
          setMenuShow(true);
        }}
      />
      {menuShow && (
        <div className="menu-overlay" onClick={(e) => e.stopPropagation()}>
          <div ref={menuRef}>
            <Menu
              onPlus={handlePlus}
              onMinus={handleMinus}
              onDelete={onDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
