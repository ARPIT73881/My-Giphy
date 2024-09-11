import React, { useEffect, useState } from "react";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";

const Favorites = () => {
  const [favoriteGifs, setFavoriteGifs] = useState([]);
  const { gf, favorites } = GifState();

  const fetchFavoriteGIFs = async () => {
    const { data: gifs } = await gf.gifs(favorites);
    setFavoriteGifs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="faded-text">My Favorites</span>
      <div className="mt-2 columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5">
        {favoriteGifs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
