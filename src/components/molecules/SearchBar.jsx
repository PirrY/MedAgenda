import React from 'react';
import './SearchBar.css'; // Para los estilos

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscador servicios médicos"
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

