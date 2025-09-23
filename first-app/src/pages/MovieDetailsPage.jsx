// Em src/pages/MovieDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom'; 
import Spinner from '../components/Spinner';

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams(); 

const TMDB_API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY; // Linha antiga comentada
//const TMDB_API_KEY = "6a6558bff0bb907b08130276caefb000"; // CHAVE ADICIONADA DIRETAMENTE

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
         console.log("INICIANDO BUSCA COM A CHAVE:", TMDB_API_KEY);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pt-BR` );
        
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        setMovie(data);

      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        setMovie(null); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, TMDB_API_KEY]);

  if (isLoading) {
    return <span><Spinner /></span>; 
  }

  if (!movie) {
    return <p>Filme não encontrado.</p>;
  }

  return (
    <div className="movie-details-container p-8 text-white">
      <RouterLink to="/" className="text-lg mb-8 inline-block">&larr; Voltar para a lista</RouterLink>
      <div className="flex flex-col md:flex-row gap-8">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg text-gray-400 mb-4">{movie.tagline}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">★</span>
            <span>{movie.vote_average.toFixed(1 )}</span>
            <span className="mx-2">|</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="mx-2">|</span>
            <span>{movie.runtime} min</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
          <p className="text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
