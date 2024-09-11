import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import Connect from "../components/Connect";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "text"];

const SingleGif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readmore, setReadMore] = useState(false);

  const { gf, addToFavorites, favorites } = GifState();

  const shareGif = () => {
    const gifUrl = gif.url;
    if (navigator.share) {
      navigator
        .share({
          title: gif.title,
          url: gifUrl,
        })
        .then(() => console.log("GIF shared successfully"))
        .catch((error) => console.error("Error sharing GIF:", error));
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(gifUrl);
      alert("GIF URL copied to clipboard!");
    }
  };

  const embedGif = () => {
    const embedCode = `<iframe src="${gif.embed_url}" width="480" height="270" frameBorder="0" allowFullScreen></iframe>`;
    navigator.clipboard.writeText(embedCode);
    alert("Embed code copied to clipboard!");
  };

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });

    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }

    fetchGif();
  }, []);

  return (
    <div className="my-10 grid grid-cols-4 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="whitespace-pre-line py-4 text-sm text-gray-400">
                {readmore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                {gif?.user?.description.length < 100 ? (
                  ""
                ) : (
                  <div
                    className="faded-text flex cursor-pointer items-center"
                    onClick={() => setReadMore(!readmore)}
                  >
                    {!readmore ? (
                      <>
                        Read less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read more <HiMiniChevronDown size={20} />
                      </>
                    )}
                  </div>
                )}
              </p>
            )}
          </>
        )}
        <Connect />
        <div className="divider">
          {gif?.source && (
            <div>
              <span className="faded-text">Source</span>
              <div className="flex items-center gap-1 text-sm font-bold">
                <HiOutlineExternalLink size={25} />
                <a href={gif.source} target="_blank" className="truncate">
                  {gif.source}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text mb-2 truncate">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* mobile Ui */}
            <div className="flex gap-1 sm:hidden">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>

              <button
                className="ml-auto"
                // onClick={shareGif}
              >
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          {/* favorites/ share /embed */}

          <div className="mt-6 hidden flex-col gap-5 sm:flex">
            <button
              className="flex items-center gap-5 text-lg font-bold"
              onClick={() => addToFavorites(gif.id)}
            >
              <HiMiniHeart
                size={30}
                className={`${favorites.includes(gif.id) ? "text-red-500" : ""}`}
              />
              Favorite
            </button>
            <button
              className="flex items-center gap-6 text-lg font-bold"
              onClick={shareGif}
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              className="flex items-center gap-5 text-lg font-bold"
              onClick={embedGif}
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div>
          <span className="font-extrabold">Related Gifs</span>
          <div className="columns-2 gap-2 md:columns-3">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
