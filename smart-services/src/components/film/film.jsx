import React, { useState } from "react";
import axios from "axios";

const Film = ({ search_query, onSearchQueryChange }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(search_query);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=b4eac118&s=${query}`
      );
      setMovies(response.data.Search || []);
      onSearchQueryChange(query);
    } catch (error) {
      console.error("Erreur lors de la recherche de films", error);
    }
  };

  return (
    <div>
      <h3>Rechercher des films</h3>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Entrer le titre d'un film"
          className="border p-2 rounded"
        />
        <button onClick={handleSearch} className="ml-2 bg-orange-500 text-white p-2 rounded">
          Rechercher
        </button>
      </div>
      <div>
        {movies.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="mb-2 text-center">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-32 h-48 object-cover mx-auto mb-2"
                />
                <h4 className="font-semibold">{movie.Title}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun film trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Film;