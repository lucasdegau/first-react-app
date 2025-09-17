import React from 'react';

const Search = ({ searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
          <img src="./search.svg" alt="Search Icon" />
          <input 
            type="text" 
            placeholder='Digite o nome do filme' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
    );
};

export default Search;