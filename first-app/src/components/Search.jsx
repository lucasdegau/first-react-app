import React from 'react';

const Search = ({ searchTerm, setSearchTerm}) => {
    return (
        <div className='text-white text-1xl'>
          {/* <input type="text" placeholder="Search..." /> */}
          {searchTerm}
        </div>
    );
};

export default Search;