import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import Connect from "../components/Connect";

const Category = () => {
  const [results, setResults] = useState([]);

  const { gf } = GifState();

  const { category } = useParams();

  const fetchResults = async () => {
    const { data } = await gf.gifs(category, category);

    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [category]);

  return (
    <div className="my-4 flex flex-col gap-5 sm:flex-row">
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]} hover={false} />}
        <span className="pt-2 text-sm text-gray-400">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <Connect />
        <div className="divider"></div>
      </div>

      <div>
        <h2 className="pb-1 text-4xl font-extrabold capitalize">
          {category.split("-").join(" & ")}GIFs
        </h2>
        <h2 className="cursor-pointer pb-3 text-lg font-bold text-gray-400 hover:text-gray-50">
          @{category}
        </h2>

        {results.length > 0 && (
          <div className="columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5">
            {results.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
