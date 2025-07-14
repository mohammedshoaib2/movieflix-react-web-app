import React from "react";

const TrendingCard = ({ trendingMovie, index }) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  //   https://api.themoviedb.org/3/movie/id/videos?language=en-US
  //   useEffect(() => {
  //     fetch(
  //       "https://api.themoviedb.org/3/movie/21614?language=en-US",
  //       API_OPTIONS
  //     ).then((response) => {
  //       response.json().then((response) => {
  //         console.log(response);
  //       });
  //     });
  //   });
  return (
    <div className=" min-w-[200px] h-[200px] flex justify-center  items-center relative cursor-pointer ">
      <img
        className="absolute left-[25px] h-[120px]"
        src={`/${index + 1}.svg`}
        alt=""
      />
      <img
        className="right-[25px] h-[160px] absolute rounded-2xl"
        src={`${
          !trendingMovie.image_url ? "/no-movie.png" : trendingMovie.image_url
        }`}
        alt=""
      />
    </div>
  );
};

export default TrendingCard;
