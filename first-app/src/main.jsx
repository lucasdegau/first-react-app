// Em: src/main.jsx

// --- IMPORTS ESSENCIAIS ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- IMPORTS DAS SUAS PÁGINAS E ESTILOS ---
import HomePage from './pages/HomePage.jsx';
import MovieDetailsPage from './pages/MovieDetailsPage.jsx';
import './index.css';

// --- CÓDIGO DO FAVICON (opcional, mas funcional) ---
import favicon from './assets/favicon.png';
const setFavicon = () => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = favicon;
};
setFavicon();

// --- CONFIGURAÇÃO DO ROTEADOR (SÓ UMA VEZ) ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/movie/:movieId",
    element: <MovieDetailsPage />,
  },
]);

// --- RENDERIZAÇÃO PRINCIPAL (SÓ UMA VEZ) ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* O RouterProvider gerencia qual página mostrar com base na URL */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
