/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ReactPlayer from "react-player";

const getDuration = (runtime) => {
  return `${Math.floor(runtime / 60)}h ` + `${Math.floor(runtime % 60)}m`;
};
const MovieDetailPage = () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState("");
  const [videoError, setVideoError] = useState("");
  const [videoLoading, setVideoLoading] = useState(true);
  const [play, setPlay] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setVideoLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    )
      .then((response) => {
        response.json().then((response) => {
          setVideoId(response.results[0].key);
        });
      })
      .catch((e) => {
        setVideoError(e.message.toString());
      })
      .finally((e) => {
        setVideoLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      API_OPTIONS
    )
      .then((response) => {
        response.json().then((response) => {
          setData(response);
        });
      })
      .catch((e) => {
        setError(e.message.toString());
        console.log(e);
      })
      .finally((_) => {
        setLoading(false);
      });
  }, []);

  return loading && data ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="px-8 py-2  flex flex-col gap-5">
      <header className="text-amber-50 flex justify-between ">
        <h2>{`${data.original_title}`}</h2>
        <div className="flex gap-2 justify-center items-center">
          <div className="flex justify-center items-center gap-1 bg-[#221F3D] px-3 py-2 rounded">
            <img className="h-4" src="/star.svg" alt="" />
            <div className="flex justify-center items-center gap-1">
              <p className="text-white text-[14px]">
                {`${data.vote_average}`}/
                <span className="text-[#A8B5DB]">10</span>
              </p>
              <p className="text-[#A8B5DB] text-[14px]">
                ({`${data.vote_count}`})
              </p>
            </div>
          </div>
          <div className="bg-[#221F3D] px-3 py-2 rounded flex justify-center items-center gap-[8px]">
            <img className="h-5" src="/grow.svg" alt="" />
            <p className="text-[14px] text-[#A8B5DB]">{`${data.popularity}`}</p>
          </div>
        </div>
      </header>

      <div className=" flex text-[#A8B5DB] gap-3   items-center">
        <p>{`${data.release_date?.split("-")[0]}`}</p>
        <span className="text-4xl">·</span>
        <p>PG-13</p>
        <span className="text-4xl">·</span>
        <p>{getDuration(data.runtime)}</p>
      </div>

      <div className="h-[400px] flex gap-8">
        <div className="w-[20%]  h-full">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt=""
          />
        </div>
        <div className="w-[80%] relative">
          {play ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              className="w-full h-full rounded-2xl object-cover"
              src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
              alt=""
            />
          )}

          <div
            onClick={(e) => {
              setPlay(true);
              document.getElementById("play").classList.add("hidden");
            }}
            id="play"
            className=" absolute bottom-[20px] left-[20px] flex gap-4 bg-white/20 backdrop-blur-md border border-white/30 cursor-pointer py-1 px-4 rounded-full"
          >
            <img src="/play.svg" alt="" />
            <p className="text-white">Trailer</p>
          </div>
        </div>
      </div>

      <div className="mt-11  flex gap-32 ">
        <div className="grid grid-rows-10 ">
          <p className="text-[#A8B5DB]">Generes</p>

          <p className="text-[#A8B5DB]">Overview</p>
          <p className="text-[#A8B5DB]">Release date</p>
          <p className="text-[#A8B5DB]">Countries</p>
          <p className="text-[#A8B5DB]">Status</p>
          <p className="text-[#A8B5DB]">Language</p>
          <p className="text-[#A8B5DB]">Budget</p>
          <p className="text-[#A8B5DB]">Revenue</p>
          <p className="text-[#A8B5DB]">Tagline</p>
          <p className="text-[#A8B5DB]">Production Companies</p>
        </div>
        <div className="grid grid-rows-10 w-full">
          <div className="flex gap-2 items-center flex-wrap">
            {data.genres ? (
              data.genres.map((gen, index) => {
                return (
                  <div key={index}>
                    <p className=" text-white bg-[#221F3D] px-3 py-1 rounded">
                      {gen.name}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-white">No genres</p>
            )}
          </div>
          <p className="text-white w-[60%]  ">
            {data.overview ? data.overview : "Not Available"}
          </p>
          <p className="text-white">
            {data.release_date ? data.release_date : "Not Available"}
          </p>
          <div className="text-white">
            {
              <div className="text-white flex ">
                {!data.production_countries
                  ? "Not Available"
                  : data.production_countries.map((cont, index) => {
                      return (
                        <p className="pr-6" key={index}>
                          {cont.name}{" "}
                        </p>
                      );
                    })}
              </div>
            }
          </div>
          <p className="text-white ">
            {data.status ? data.status : "Not Available"}
          </p>
          <p className="text-white ">
            {data.original_language ? data.original_language : "Not Available"}
          </p>
          <p className="text-white ">
            ${data.budget ? data.budget : "Not Available"}
          </p>
          <p className="text-white ">
            ${data.revenue ? data.revenue : "Not Available"}
          </p>
          <p className="text-white ">
            {data.tagline ? data.tagline : "Not Available"}
          </p>
          <div className="text-white flex ">
            {!data.production_companies
              ? "Not Available"
              : data.production_companies.map((comp, index) => {
                  return (
                    <p className="pr-6" key={index}>
                      {comp.name}
                    </p>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;

// <div className="flex  items-center  gap-32">
//           <p className="text-[#A8B5DB]">Overview</p>
//           <p className="text-white w-[40%]">{data.overview}</p>
//         </div>

//         <div className="flex  items-center  gap-32">
//           <p className="text-[#A8B5DB]">Release date</p>
//           <p className="text-white w-[40%]">{data.release_date}</p>
//         </div>
