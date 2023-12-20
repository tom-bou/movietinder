import "../style.css";
import trailer from "../images/trailer.png";
import React, { useState } from "react";
import VideoModal from "./videoModal";

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
      className="rounded-lg snap-y snap-mandatory overflowY-scroll relative h-full w-full bg-fixed animate-fade"
>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-h-full">
        {/* First column */}
        <div className="lg:col-span-1 flex flex-col justify-center items-center">
          <div className="w-1/2 pt-8 flex justify-center items-center h-full">
            <img
              className="poster-edge-gradient shadow-lg"
              style={{ filter: "drop-shadow(0 0 1.5em #412EBB)" }}
              src={image_url}
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
                video_url={video_url}
              />
            )}
          </div>
        </div>

        {/* RIGHT PART*/}
        <div className="lg:col-span-1 md:h-full grid grid-rows-3 ml-4 mr-4 md:mr-20">
          {/* Row 1 */}

          <div className="md:mt-32 h-2/5 grid grid-cols-2 ">
            {/* First column in the first row */}
            <div className="flex justify-center">
              {/* Content for the first column in the first row */}
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

            {/* Second column in the first row */}
            <div className="flex justify-center">
              {/* Content for the second column in the first row */}
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
                  {genresToString(props.movieData.genres)}
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className=" md:mt-6 h-2/5 grid grid-cols-2">
            {/* First column in the second row */}
            <div className="flex justify-center">
              {/* Content for the first column in the second row */}
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
                  {props.movieData.cast.map((actor, index) => {
                    return (
                      actor.name +
                      (index == props.movieData.cast.length - 1 ? "" : ", ")
                    );
                  })}
                </p>
              </div>
            </div>

            {/* Second column in the second row */}
            <div className="flex justify-center">
              {/* Content for the second column in the second row */}
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

          {/* Row 3 */}
          <div className=" p-2 h-1/5 flex justify-center">
            {/* Content for the third row */}
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
