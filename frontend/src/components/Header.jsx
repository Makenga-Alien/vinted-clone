import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ background: "#eee", padding: "1rem", display: "flex", justifyContent: "space-between" }}>
      <h1><Link to="/" style={{ textDecoration: "none", color: "black" }}>Vinted Clone</Link></h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
