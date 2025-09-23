import React, { useState, useEffect, use } from 'react';
import { useDebounce } from 'react-use';
import Search from '../components/Search';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { getTrendingMovies, updateSearchCount } from '../appwrite.js';
import Footer from "../components/Footer"


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;


const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
}
console.log("Chave da API:", API_KEY);

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useDebounce(
      () => {
        setDebouncedSearchTerm(searchTerm);
      },
      700,
      [searchTerm]
    );


     const fetchMovies = async (query = '') => {  
      setIsLoading(true);
      setErrorMessage('');

      try {
        // --- INÍCIO DA PARTE MODIFICADA ---

        // Define a URL base
        const baseUrl = query
          ? `${API_BASE_URL}/search/movie`
          : `${API_BASE_URL}/discover/movie`;

        // Adiciona os parâmetros obrigatórios, incluindo a chave da API
        const params = new URLSearchParams({
          api_key: API_KEY,
          language: 'pt-BR' // Boa prática adicionar o idioma
        });

        // Se houver um termo de busca, adiciona ao parâmetro
        if (query) {
          params.append('query', query);
        } else {
          // Se não, adiciona o parâmetro de ordenação para a página inicial
          params.append('sort_by', 'popularity.desc');
        }

        // Monta a URL final
        const endpoint = `${baseUrl}?${params.toString()}`;

        // --- FIM DA PARTE MODIFICADA ---

        const response = await fetch(endpoint, API_OPTIONS); // Lembre-se que API_OPTIONS não tem mais o 'Authorization'
      
        if (!response.ok) {
          // Converte a resposta de erro para JSON para ver a mensagem da API
          const errorData = await response.json();
          throw new Error(errorData.status_message || 'Erro na requisição');
        }
        const data = await response.json();
        if (data.response === 'False') {
          setErrorMessage(data.error || 'Nenhum filme encontrado.');
          setMovieList([]);
          return;
        }
        setMovieList(data.results || []);

        if(query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
        
      } catch (error) {
        console.error(`Erro ao obter filmes:, ${`error`}`);
        setErrorMessage('Falha ao encontrar filmes. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
      
    }

    const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Erro ao carregar filmes em alta: ${`error`}`);
      }
    } 

    useEffect(() => {
      fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
      loadTrendingMovies();
    }, []);

  return ( 
    <main>
    
      <div className='pattern' />

      <div className='wrapper'>
        <header>

          <img src="./hero.png" alt="Hero Banner" />
           <h1>Descubra os <span className='text-gradient'>melhores filmes </span>
            atualmente!
           </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        { trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Filmes em alta</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id} movie={movie}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} title={movie.searchTerm} />
                  </li> 
              ))}
              </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>Todos os filmes</h2>

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
      <Footer />

    </main>
   );
   
}

  
export default HomePage;
