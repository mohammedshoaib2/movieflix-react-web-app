import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card h-[300px] cursor-pointer">
      <img
        className="h-[80%] w-full object-cover bg-center"
        src={
          !movie.poster_path
            ? "/no-movie.png"
            : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        }
        alt=""
      />

      <div className="my-2 flex flex-col justify-start ">
        <h3>{!movie.title ? "NA" : movie.title}</h3>

        <div className="flex justify-start items-center gap-2">
          <img className="h-[16px] w-[16px]" src="/star.svg" alt="" />

          <h3>{!movie.vote_average ? "NA" : movie.vote_average.toFixed(1)}</h3>
          <h2 className="text-[#9CA4AB]">·</h2>
          <p className="text-[#9CA4AB] font-medium ">
            {!movie.original_language
              ? "NA"
              : movie.original_language.toUpperCase()}
          </p>
          <h2 className="text-[#9CA4AB]">·</h2>
          <p className="text-[#9CA4AB] font-medium ">
            {!movie.release_date ? "NA" : movie.release_date.split("-")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
