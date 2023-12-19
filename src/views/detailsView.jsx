import "../style.css";
import trailer from "../images/trailer.png";
import React, { useState } from "react";
import VideoModal from './videoModal';

export default function DetailsView(props) {
  var image_url =
    "https://image.tmdb.org/t/p/w780/" + props.movieData.poster_path;

  var video_url = "https://www.youtube.com/embed/" + props.movieData.video;

  props.movieData.cast = props.movieData.cast.slice(0, 4);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function genresToString(genresArray) {
    const genreString = genresArray.reduce((accumulator, currentVal, index) => {
      if (index == 0) {
        return accumulator + currentVal.name;
      } else {
        return accumulator + ", " + currentVal.name;
      }
    }, "");
    return genreString;
  }

  return (
    <div
      className="flex bg-custom-purple relative animate-fade"
      style={{
        background: "transparent",
      }}
    >
      <div className="p-1 flex-column">
        {" "}
        {/* Leftmost column */}
        <div className="h-2/3 mt-10 flex items-center justify-center p-1">
          {" "}
          {/* Upper left */}
          <div className="flex items-center justify-center h-full w-full max-h-fit max-w-fit">
            {" "}
            {/* Div surrounding image element */}
            <img
              className="max-h-full poster-edge-gradient shadow-lg"
              style={{ filter: "drop-shadow(0 0 1.5em #412EBB)" }}
              src={image_url}
              alt="Movie poster"
            />
          </div>
        </div>
        <div className="">
          {" "}
          {/* Lower left */}
          <div className="flex justify-center items-start space-x-6 p-5">
            <button className="w-20 h-20" onClick={openModal}>
              <img src={trailer} alt="Trailer" />
            </button>
            {isModalOpen && (
              <VideoModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                video_url={video_url}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex-column">
        {" "}
        {/* Rightmost column */}
        <div className="h-16 pr-3 flex justify-end"> {/* Upper right */}</div>
        <div className="h-1/2 flex m-auto p-2.5 mr-10">
          {" "}
          {/* Middle right */}
          <div className="w-full h-full grid grid-cols-2 gap-2 text-center">
            <div className="p-2 justify-center">
              <p
                className="shadow-white-glow text-3xl font-bold font-sans"
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
              >
                TITLE
              </p>
              <p className="text-category-body font-thin font-sans">
                {props.movieData.original_title}
              </p>
            </div>
            <div className="p-2 justify-center">
              <p
                className="shadow-white-glow text-3xl font-bold font-sans"
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
              >
                GENRE
              </p>
              <p className="text-category-body font-thin font-sans">
                {genresToString(props.movieData.genres)}
              </p>
            </div>
            <div className="p-2 justify-center">
              <p
                className="shadow-white-glow text-3xl font-bold font-sans"
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
              >
                ACTORS
              </p>
              <p className="text-category-body font-thin font-sans">
                {props.movieData.cast.map((actor, index) => {
                  return (
                    actor.name +
                    (index == props.movieData.cast.length - 1 ? "" : ", ")
                  );
                })}
              </p>
            </div>
            <div className="p-2 justify-center">
              <p
                className="shadow-white-glow text-3xl font-bold font-sans"
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
              >
                DIRECTOR
              </p>
              <p className="text-category-body font-thin font-sans">
                {props.movieData.director.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 pr-10 mr-6">
          {" "}
          {/* Lower right */}
          <p
            className="text-center shadow-white-glow text-3xl font-bold font-sans"
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
  );
}
