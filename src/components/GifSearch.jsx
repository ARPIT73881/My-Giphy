import React, { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGIFs = async () => {
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`);
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchGIFs();
          }
        }}
        placeholder="Search all the GIFs and Stickers"
        className="w-full rounded-bl rounded-tl border border-gray-300 py-5 pl-4 pr-14 text-xl text-black outline-none"
      />

      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-20 top-6 mr-2 rounded-full bg-gray-300 opacity-90"
        >
          <HiMiniXMark size={22} />
        </button>
      )}

      <button
        onClick={searchGIFs}
        className="rounded-br rounded-tr bg-gradient-to-tr from-pink-600 to-pink-400 px-4 py-2 text-white"
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
      </button>
    </div>
  );
};

export default GifSearch;
