# App Filmes em Alta 🎬

Bem-vindo ao Movie Database App! Uma aplicação web moderna e responsiva para descobrir os melhores e mais populares filmes do momento. Pesquise por títulos, veja os filmes em alta e explore detalhes como sinopse, avaliação e muito mais.

**Acesse a versão ao vivo:** [https://moviedatabase-tau.vercel.app/](https://moviedatabase-tau.vercel.app/ )

---

## ✨ Funcionalidades

-   **Página Inicial Dinâmica:** Exibe os filmes mais populares do momento.
-   **Busca em Tempo Real:** Encontre qualquer filme com uma barra de pesquisa inteligente e com *debounce* para otimizar as chamadas à API.
-   **Filmes em Alta:** Uma seção dedicada aos filmes que estão em alta, com base em dados do Appwrite.
-   **Página de Detalhes:** Clique em um filme para ver informações detalhadas, incluindo pôster, sinopse, avaliação, duração e ano de lançamento.
-   **Design Responsivo:** Interface totalmente adaptável para desktops, tablets e celulares.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   **Frontend:**
    -   [**React**](https://reactjs.org/ ) (com [**Vite**](https://vitejs.dev/ )) - Para uma base de desenvolvimento rápida e moderna.
    -   [**Tailwind CSS**](https://tailwindcss.com/ ) - Para estilização ágil e componentizada.
-   **Backend & API:**
    -   [**The Movie Database (TMDB) API**](https://www.themoviedb.org/documentation/api ) - Como fonte principal para os dados dos filmes.
    -   [**Appwrite**](https://appwrite.io/ ) - Utilizado para funcionalidades adicionais, como a lista de "Filmes em Alta".
-   **Deployment:**
    -   [**Vercel**](https://vercel.com/ ) - Para deploy contínuo e hospedagem de alta performance.

---

## 🚀 Como Rodar o Projeto Localmente

Para rodar este projeto no seu ambiente de desenvolvimento, siga os passos abaixo.

**1. Pré-requisitos:**
   - Você precisa ter o [Node.js](https://nodejs.org/en/ ) (versão 18 ou superior) e o [Git](https://git-scm.com/ ) instalados na sua máquina.

**2. Clone o Repositório:**
   ```bash
   git clone https://github.com/lucasdegau/first-react-app.git
   cd first-react-app
   ```

**3. Instale as Dependências:**
   ```bash
   npm install
   ```

**4. Configure as Variáveis de Ambiente:**
   - Crie um arquivo chamado `.env` na raiz do projeto.
   - Adicione as seguintes variáveis, substituindo os valores pelos seus próprios segredos:
     ```env
     # Chave da API do The Movie Database (TMDB ) - v3 Auth
     VITE_REACT_APP_TMDB_API_KEY="SUA_CHAVE_DA_API_DO_TMDB"

     # Variáveis do Appwrite
     VITE_APPWRITE_PROJECT_ID="SEU_PROJECT_ID_DO_APPWRITE"
     VITE_APPWRITE_DATABASE_ID="SEU_DATABASE_ID_DO_APPWRITE"
     VITE_APPWRITE_TABLE_ID="SEU_TABLE_ID_DO_APPWRITE"
     ```

**5. Rode a Aplicação:**
   ```bash
   npm run dev
   ```
   - A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso ).

---

## 🎯 Próximos Passos (Roadmap)

-   [ ] **Melhorar a Página de Detalhes:**
    -   [ ] Adicionar elenco (atores).
    -   [ ] Incorporar trailers de vídeo do YouTube.
    -   [ ] Exibir gêneros do filme.
-   [ ] **Adicionar Paginação:** Implementar paginação na lista "Todos os filmes" para carregar mais resultados.
-   [ ] **Refinar o Design:** Melhorar a interface do usuário e a experiência geral.

---

## 👤 Autor

**Lucas Roque**

-   Linkedin: [@Lucas Roque](https://www.linkedin.com/in/lucasbarbosaroque/)

