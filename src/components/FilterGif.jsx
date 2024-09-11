import React from "react";
import { GifState } from "../context/GifContext";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();
  return (
    <div
      className={`my-3 flex gap-3 ${alignLeft ? "" : "justify-end"} ${showTrending ? "flex-col justify-between sm:flex-row md:items-center" : ""}`}
    >
      {showTrending && (
        <span className="flex gap-2">
          {showTrending && (
            <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          )}
          <span className="font-semibold text-gray-400">Trending</span>
        </span>
      )}
      <div className="flex min-w-80 rounded-full bg-gray-800">
        {filters.map((f) => {
          return (
            <span
              onClick={() => {
                setFilter(f.value);
              }}
              className={`${filter === f.value ? f.background : ""} w-1/3 cursor-pointer rounded-full py-2 text-center font-semibold`}
              key={f.title}
            >
              {f.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;
