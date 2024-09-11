import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import FilterGif from "../components/FilterGif";
import Gif from "../components/Gif";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { gf, filter } = GifState();
  const { query } = useParams();

  const fetchSearchResult = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });
    setSearchResult(data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="pb-3 text-5xl font-extrabold">{query}</h2>

      <FilterGif alignLeft={true} />

      {searchResult.length > 0 ? (
        <div className="columns-2 gap-2 md:columns-3 lg:columns-4">
          {searchResult.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for this {query}. Try searching for stickers instead ?{" "}
        </span>
      )}
    </div>
  );
};

export default Search;
