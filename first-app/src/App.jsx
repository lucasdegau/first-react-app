import React, { useState, useEffect, use } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useDebounce(
      () => {
        setDebouncedSearchTerm(searchTerm);
      },
      500,
      [searchTerm]
    );


    const fetchMovies = async (query = '') => {  
      setIsLoading(true);
      setErrorMessage('');


      try {
        const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS);
      
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const data = await response.json();
        if (data.response === 'False') {
          setErrorMessage(data.error || 'Nenhum filme encontrado.');
          setMovieList([]);
          return;
        }
        setMovieList(data.results || []);
        
      } catch (error) {
        console.error('Erro ao obter filmes:, ${error}');
        setErrorMessage('Falha ao encontrar filmes. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
      
    }
    
    useEffect(() => {
      fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

  return ( 
    <main>
      
      <div className='pattern' />

      <div className='wrapper'>
        <header>

          <img src="./hero.png" alt="Hero Banner" />
           <h1>Descubra indicações de <span className='text-gradient'>filmes </span>
            moldadas para você!
           </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className="mt-[40px]">Todos os filmes</h2>

          { isLoading ? (
           <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            </ul>
          )}
        </ section>
      </div>

    </main>
   );
}

export default App;
