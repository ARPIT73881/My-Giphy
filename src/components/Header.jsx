import React, { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/GifContext";
import GifSearch from "./GifSearch";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative mb-2 flex items-center justify-between gap-4">
        <Link to="/" className="flex gap-2">
          <img className="w-8" src="/logo.svg" alt="giphy logo" />
          <h1 className="cursor-pointer text-5xl font-bold tracking-tight">
            GIPHY
          </h1>
        </Link>

        <div className="text-md flex items-center gap-2 font-bold">
          {/* Render categories */}
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`${category.name_encoded}`}
                className="hover:gradient hidden border-b-4 px-4 py-1 lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`hover:gradient hidden ${showCategories ? "gradient" : ""} border-b-4 py-0.5 lg:block`}
            />
          </button>

          {favorites.length > 0 && (
            <div className="h-9 cursor-pointer rounded bg-gray-700 px-6 pt-1.5">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}

          <button>
            <HiMiniBars3BottomRight
              className="block text-sky-400 lg:hidden"
              size={30}
            />
          </button>
        </div>
        {showCategories && (
          <div className="gradient absolute right-0 top-14 z-20 w-full px-10 pb-9 pt-6">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="my-5 bg-gray-100 opacity-50" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {categories?.map((category) => {
                return (
                  <Link
                    className="font-bold"
                    key={category.name}
                    to={`${category.name_encoded}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search  */}

      {/* GifSearch  */}
      <GifSearch />
    </nav>
  );
};

export default Header;
