import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import likebutton from "../images/likebutton.png";
import fire from "../images/fire.png";
import logo from "../images/logo.png";
import DetailModal from "./detailModal";
import { toJS } from "mobx";

function LikedMoviesView(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);



  // Navigate functions
  function windowToSwipe() {
    props.goToSwipe();
  }

  function windowToStartPage() {
    props.goToStart();
  }

  // Modal control functions
  function openModal(movie) {
    setCurrentMovie(movie);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // Fetching liked movies
  
  function renderMovie(movie) {

    return (
      <div key={movie.id} className="mb-2 animate-fade-up animate-delay-200">
        <img
          onClick={() => openModal(movie)}
          src={"https://image.tmdb.org/t/p/w780/" + movie.poster_path}
          alt={movie.original_title}
          className="rounded-lg shadow-lg"
          style={{
            filter: "drop-shadow(0 0 0.75rem #D300FE)",
            cursor: "pointer",
          }}
          width="190"
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen minimum-margin"
      style={{
        background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
      }}
    >
      {isModalOpen && currentMovie && (
        <DetailModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          movie={currentMovie}
        />
      )}
      <div className="navbar-swipe-buttons">
        <button class="shadow-inner absolute left-2 top-7 lg:w-40 w-16">
          <img
            className=" xl:flex shadow-inner absolute"
            onClick={windowToStartPage}
            src={logo}
            alt="Logo icon"
            style={{ filter: "drop-shadow(0 0 0.2rem #C772ED)" }}
          />
        </button>
        <span
          className="spanButton absolute top-7 lg:top-10 right-7"
          onClick={windowToSwipe}
        >
          <h1
            className="relative text-3xl font-thin font-sans w-11 hidden lg:inline lg:mr-2 top-2"
            style={{ color: "#FFE370", textShadow: "0px 0px 4px #FFE370" }}
          >
            Swipe
          </h1>
          <img
            src={fire}
            alt="Fire icon"
            className="relative w-7 lg:w-10 inline"
          />
        </span>
      </div>

      <div className="text-center flex flex-col">
        <h1
          className="text-3xl font-thin font-sans inline-block ml-3"
          style={{
            color: "#FF7272",
            textShadow: "0px 0px 4px #FF3131",
            dispay: "inline-block",
          }}
        >
          Your Likes
          <div className="inline ml-1">
            <img
              style={{ "margin-top": "-10px" }}
              src={likebutton}
              alt="Heart icon"
              className="w-9 inline"
            />
          </div>
        </h1>
        <h2
          className="text-3xl font-thin font-sans"
          style={{
            color: "#FF7272",
            textShadow: "0px 0px 4px #FF3131",
            dispay: "inline-block",
          }}
        >
          {props.likedMovies.length}
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-20 m-20">
        {props.likedMovies.map((movie) => renderMovie(movie))}
      </div>

      {props.showSessionLikes && (
        <div className="text-center flex flex-col">
          <h1
            className="text-3xl font-thin font-sans inline-block ml-3"
            style={{
              color: "#FF7272",
              textShadow: "0px 0px 4px #FF3131",
              dispay: "inline-block",
            }}
          >
            Session Likes
            <div className="inline ml-1">
              <img
                style={{ "margin-top": "-10px" }}
                src={likebutton}
                alt="Heart icon"
                className="w-9 inline"
              />
            </div>
          </h1>
          <h2
            className="text-3xl font-thin font-sans"
            style={{
              color: "#FF7272",
              textShadow: "0px 0px 4px #FF3131",
              dispay: "inline-block",
            }}
          >
            {props.sessionLikes.length}
          </h2>

          <div className="flex flex-wrap justify-start gap-20 m-20">
            {props.sessionLikes.map((movie) => renderMovie(movie))}
          </div>
        </div>

      )}
    </div>
  );
}

export default LikedMoviesView;
