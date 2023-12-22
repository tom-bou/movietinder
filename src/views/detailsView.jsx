import "../style.css";
import React, { useState } from "react";
import VideoModal from "./videoModal";
import trailer from "../images/trailer.png";

export default function DetailsView(props) {
  props.movieData.cast = props.movieData.cast.slice(0, 4);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="rounded-lg snap-y snap-mandatory overflowY-scroll relative h-full w-full bg-fixed animate-fade">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-h-full">
        <div className="lg:col-span-1 flex flex-col justify-center items-center">
          <div className="w-1/2 pt-8 flex justify-center items-center h-full">
            <img
              className="poster-edge-gradient shadow-lg"
              style={{ filter: "drop-shadow(0 0 1.5em #412EBB)" }}
              src={
                "https://image.tmdb.org/t/p/w780/" + props.movieData.poster_path
              }
              alt="Movie poster"
            />
          </div>
          <div className="flex justify-bottom items-start p-5">
            <button className="w-20 h-20" onClick={openModal}>
              <img src={trailer} className="hover:animate-jump" alt="Trailer" />
            </button>
            {isModalOpen && (
              <VideoModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                video_url={
                  "https://www.youtube.com/embed/" + props.movieData.video
                }
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-1 md:h-full grid grid-rows-3 ml-4 mr-4 md:mr-20">
          <div className="md:mt-32 h-2/5 grid grid-cols-2 ">
            <div className="flex justify-center">
              <div className="p-2 justify-center text-center">
                <p
                  className="shadow-white-glow text-xl md:text-3xl font-bold font-sans"
                  style={{
                    color: "#F4FDCF",
                    textShadow: "0px 0px 6px #FFE370",
                  }}
                >
                  TITLE
                </p>
                <p className="text-lg text-white md:text-2xl font-thin font-sans">
                  {props.movieData.original_title}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-2 justify-center text-center">
                <p
                  className="shadow-white-glow text-xl md:text-3xl font-bold font-sans"
                  style={{
                    color: "#F4FDCF",
                    textShadow: "0px 0px 6px #FFE370",
                  }}
                >
                  GENRE
                </p>
                <p className="text-lg text-white md:text-2xl font-thin font-sans">
                  {props.movieData.genres
                    .map((item) => item["name"])
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className=" md:mt-6 h-2/5 grid grid-cols-2">
            <div className="flex justify-center">
              <div className="p-2 justify-center text-center">
                <p
                  className="shadow-white-glow text-xl md:text-3xl font-bold font-sans"
                  style={{
                    color: "#F4FDCF",
                    textShadow: "0px 0px 6px #FFE370",
                  }}
                >
                  ACTORS
                </p>
                <p className="text-lg text-white md:text-2xl font-thin font-sans">
                  {props.movieData.cast.map((item) => item["name"]).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-2 justify-center text-center">
                <p
                  className="shadow-white-glow text-xl md:text-3xl font-bold font-sans"
                  style={{
                    color: "#F4FDCF",
                    textShadow: "0px 0px 6px #FFE370",
                  }}
                >
                  DIRECTOR
                </p>
                <p className="text-lg text-white md:text-2xl font-thin font-sans">
                  {props.movieData.director.name}
                </p>
              </div>
            </div>
          </div>

          <div className=" p-2 h-1/5 flex justify-center">
            <div className=" flex flex-col md:space-y-4 text-center mx-auto">
              <p
                className="text-center shadow-white-glow text-xl md:text-3xl font-bold font-sans"
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
              >
                STORYLINE
              </p>
              <p className="text-white text-center text-lg font-thin font-sans">
                {props.movieData.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
