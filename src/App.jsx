/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { databseServices } from "../appwrite/databaseService.js";
import TrendingCard from "./components/TrendingCard.jsx";
import { Link } from "react-router-dom";
const App = () => {
  const [search, setSearch] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [debounceSearch, setDebounceSearch] = useState("");
  const [trendingMovieData, setTrensdingMovieData] = useState([]);
  const [trendingMovieLoading, setTrendingMovieLoading] = useState(true);
  const [trendingMovieError, setTrendingMovieError] = useState("");
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const fetchMovies = async (query = "") => {
    setLoading(true);

    setError("");
    const endpoint = !query
      ? `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      : `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Something went worng");
      }
      const parsedResponse = await response.json();

      if (query) {
        await databseServices.updateTrendingTerm({
          image_url: `https://image.tmdb.org/t/p/w500/${parsedResponse.results[0].poster_path.toString()}`,
          movie_id: parsedResponse.results[0].id.toString(),
          search_term: query.toString(),
        });
      }

      setMovieData(parsedResponse.results);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useDebounce(() => setDebounceSearch(search), 500, [search]);

  useEffect(() => {
    setTrendingMovieLoading(true);
    databseServices
      .getTrendingMovies()
      .then((response) => {
        setTrensdingMovieData(response);
      })
      .catch((e) => {
        setTrendingMovieError(e.message.toString());
      })
      .finally((e) => {
        setTrendingMovieLoading(false);
      });
  }, []);
  useEffect(() => {
    fetchMovies(debounceSearch);
  }, [debounceSearch]);

  return (
    <main>
      <div className="h-screen w-full absolute bg-cover bg-center z-0">
        <img className="w-full h-full" src="/hero-bg.png" alt="" />
      </div>

      <div className="py-12 px-5 h-full max-w-7xl mx-auto relative z-10 flex flex-col justify-center items-center gap-10">
        <img className="h-[40px]" src="/logo-main.png" alt="logo" />
        <img
          className="h-[250px] max-sm:h-[200px]"
          src="/hero.png"
          alt="logo"
        />
        <p className="text-6xl w-1/2 text-center font-bold text-white max-sm:text-2xl max-lg:text-4xl  ">
          Find <span className="text-gradient">Movies</span> You’ll Love Without
          the Hassle
        </p>
        <Search setSearch={setSearch} search={search} />
      </div>
      {/* Trending movies Section */}
      <section className="relative z-10 mx-16 mb-8">
        <h3 className="text-white text-[24px] font-bold mb-8">Trending</h3>

        <div className=" w-full flex flex-auto justify-center md:justify-between items-center gap-1 flex-wrap ">
          {trendingMovieLoading ? (
            <Spinner />
          ) : trendingMovieError ? (
            <p>Something went wrong</p>
          ) : (
            trendingMovieData.map((movie, index) => {
              return (
                <TrendingCard key={index} trendingMovie={movie} index={index} />
              );
            })
          )}
        </div>
      </section>

      {/* All movies section */}
      <section className="relative z-10 mx-16 mb-8">
        <h3 className="text-white text-[24px] font-bold mb-8">All Movies</h3>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-400">`${error.message}`</p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movieData.length === 0 ? (
              <p className="text-white font-bold">{`No Movies Found`}</p>
            ) : (
              movieData.map((movie, index) => {
                return (
                  <Link key={index} to={`/movie/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                );
              })
            )}
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;
