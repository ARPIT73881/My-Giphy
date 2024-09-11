import React, { useEffect, useState } from "react";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false);

  const fetchTrendingGIFs = async (pageNum = 1) => {
    setLoading(true);
    const { data } = await gf.trending({
      limit: 20,
      type: filter,
      rating: "g",
      offset: (pageNum - 1) * 20, // Pagination: offset is based on page number
    });

    setGifs((prevGifs) => (pageNum === 1 ? data : [...prevGifs, ...data]));
    setLoading(false);
  };

  // Initial fetch and whenever the filter changes
  useEffect(() => {
    setPage(1);
    fetchTrendingGIFs(1);
  }, [filter]);

  // Infinite scroll: detect when the user scrolls near the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1); // Increment the page number
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Fetch new GIFs when the page number changes
  useEffect(() => {
    if (page > 1) {
      fetchTrendingGIFs(page);
    }
  }, [page]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 w-full rounded"
      />

      {/* FilterGif component */}
      <FilterGif showTrending />

      <div className="columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.id} />;
        })}
      </div>

      {loading && <div>Loading more GIFs...</div>}
    </div>
  );
};

export default Home;
