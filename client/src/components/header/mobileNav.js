import React from "react";
import { Link } from "react-router-dom";
import "./styles/mobileNav.css";

export default function MobileNav({ isOpen, setIsOpen }) {
  const gotoPage = () => {
    setIsOpen(false);
  };
  return (
    <nav className={`nav ${isOpen && "active"}`}>
      <div className="nav-inner">
        <ul>
          <Link to="/">
            <li onClick={gotoPage}>
              <a href="##" className="nav-item">
                home
              </a>
            </li>
          </Link>

          <Link to="/profile">
            <li onClick={gotoPage}>
              <a href="##" className="nav-item">
                history
              </a>
            </li>
          </Link>

          <Link to="/profile">
            <li onClick={gotoPage}>
              <a href="##" className="nav-item">
                profile
              </a>
            </li>
          </Link>

          <Link to="/cart">
            <li onClick={gotoPage}>
              <a href="##" className="nav-item">
                cart
              </a>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
