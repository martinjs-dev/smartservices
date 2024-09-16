import React, { useState } from "react";
import axios from "axios";

const Quote = ({ search_query, onSearchQueryChange }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("")

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=${res}`,
        {
          headers: { 'X-Api-Key': 'qjD0rQwKmetrJxRo1YS75g==GUu9jDnGrL2Wbuxx'},
        }
      );
      setQuotes(response.data || []);
      onSearchQueryChange(search_query);
    } catch (error) {
      console.error("Erreur lors de la recherche de citations", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Rechercher des citations</h3>
      <div className="mb-4">
        <input
          type="text"
          value={search_query}
          onChange={(e) => setRes(e.target.value)}
          placeholder="Entrer une catégorie"
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-orange-500 text-white p-2 rounded"
        >
          Rechercher
        </button>
      </div>

      {loading ? (
        <p>Chargement des citations...</p>
      ) : (
        <div>
          {quotes.length > 0 ? (
            quotes.map((quote, index) => (
              <div key={index} className="mb-4">
                <p className="italic">"{quote.quote}"</p>
                <p className="text-right">- {quote.author}</p>
              </div>
            ))
          ) : (
            <p>Aucune citation trouvée.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quote;






