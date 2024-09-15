import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { MusicContext } from "../../context/MusicContext";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const musicContext = useContext(MusicContext);
  const setResultOffset = musicContext.setResultOffset;
  return (
    <>
      <nav className="w-full py-2 bg-dark">
        <div className="w-full">
          <div
            className="d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              className="p-2 rounded-lg border border-orange-500 me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              onClick={() => {
                setResultOffset(0);
                fetchMusicData();
              }}
              className="bg-orange-500 p-2 rounded"
            >
              <span className="text-white">Search</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
