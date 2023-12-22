import "../style.css";
import "flowbite";
import { useNavigate } from "react-router-dom";
import dislikebutton from "../images/dislikebutton.png";
import likebutton from "../images/likebutton.png";
import trailer from "../images/trailer.png";
import logo from "../images/logo.png";
import React, { useState } from "react";
import VideoModal from "./videoModal";

function MoviePageView(props) {
  props.movieData.cast = props.movieData.cast.slice(0, 4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationType, setAnimationType] = useState(null);

  function likeACB(evt) {
    setAnimationType("like");
    setTimeout(() => props.onLike(), 1500);
  }

  function dislikeACB(evt) {
    setAnimationType("dislike");
    setTimeout(() => props.onDislike(), 1500);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  let navigate = useNavigate();

  function windowToLikes(evt) {
    navigate("/yourlikes");
  }

  function windowToStartPage(evt) {
    navigate("/");
  }

  return (
    <div
      className="snap-y snap-mandatory overflowY-scroll lg:overflow-hidden overflow-x-hidden h-screen w-screen bg-fixed animate-fade"
      style={{
        background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
      }}
    >
      <div style={{ overflow: "hidden" }} className="overflow-hidden">
        {(animationType === "like" || animationType === "dislike") &&
          Array.from({ length: 77 }).map((_, index) => (
            <img
              key={index}
              src={animationType === "like" ? likebutton : dislikebutton}
              className="heart-animation inline"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random()}s`,
                animationDelay: `${0}s`,
              }}
            />
          ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="lg:col-span-1 h-screen flex flex-col justify-center items-center">
          <img
            className="h-2/3 max-w-full poster-edge-gradient shadow-lg"
            style={{ filter: "drop-shadow(0 0 1.5em #412EBB)" }}
            src={
              "https://image.tmdb.org/t/p/w780/" + props.movieData.poster_path
            }
            alt="Movie poster"
          />
          <div className="flex justify-center items-start space-x-6 p-5">
            <button
              onClick={dislikeACB}
              disabled={animationType}
              className=" w-20 h-20"
            >
              <img
                src={dislikebutton}
                className="hover:animate-jump"
                alt="Dislike"
              />
            </button>
            <button
              className="w-20 h-20"
              disabled={animationType}
              onClick={openModal}
            >
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
            <button
              onClick={likeACB}
              disabled={animationType}
              className="w-24 h-24 -mt-2"
            >
              <img src={likebutton} className="hover:animate-jump" alt="Like" />
            </button>
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
      <button className="shadow-inner absolute md:left-2 md:top-7 top-7 left-2 md:w-40 w-16">
        <img
          className=" xl:flex shadow-inner absolute"
          onClick={windowToStartPage}
          src={logo}
          alt="Logo icon"
          style={{ filter: "drop-shadow(0 0 0.2rem #C772ED)" }}
        />
      </button>
      <button
        onClick={windowToLikes}
        className="text-3xl font-thin font-sans absolute right-3 md:right-11 top-7 md:top-7 lg:top-10"
        style={{ color: "#FF7272", textShadow: "0px 0px 4px #FF3131" }}
      >
        <span className="hidden lg:inline">Your likes</span>
        <span className="text-4xl"> ♡</span>
      </button>
    </div>
  );
}

export default MoviePageView;