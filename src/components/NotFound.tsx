import React from "react";
import "../styles/not-found.scss"; // Importa el archivo CSS para el estilo

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="title">404 - Page Not Found</h1>
      <p className="description">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="search-animation"></div>
    </div>
  );
};

export default NotFound;
