import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {["/", "/about"].map((path, idx) => (
              <li className="nav-item" key={idx}>
                <Link className={`nav-link ${location.pathname === path ? "active" : ""}`} to={path}>
                  {path === "/" ? "Home" : "About"}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex">
            {localStorage.getItem('token') ? (
              <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>
            ) : (
              ["login", "signup"].map((route) => (
                <Link key={route} className="btn btn-primary mx-1" to={`/${route}`} role="button">
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
