import React, { useState } from 'react';
import Search from './components/Search';


const App = () => {
    const [searchTerm, setSearchTerm] = useState('I AM BATMAN');


  return ( 
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>

        <img src="./hero.png" alt="Hero Banner" />
          <h1>Descubra indicações de <span className='text-gradient'>filmes</span> moldadas para você!</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

    </main>
   );
}

export default App;

