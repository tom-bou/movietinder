import { removeMovieFromLiked } from "../presenter/likesPresenter.jsx";
import likebutton from "../images/likebutton.png";
import { useSelector, useDispatch } from "react-redux";
import fire from "../images/fire.png";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DetailModal from './detailModal';

const likedMovies = [
  {
    // Example of movie object from API
    id: 226,
    original_title: "Don't Don't Cry",
    poster_path: "/nKXTgbruSrezC1tAeKB6Ri7cGkK.jpg",
    director: {
      name: "Kimberly Peirce",
    },
    cast: [
      { name: "Hilary Swank" },
      { name: "Chloë Sevigny" },
      { name: "Peter Sarsgaard" },
    ],
    genres: [{ name: "Crime" }, { name: "Drama" }],
    overview:
      "Bla bla bla this is a sample overview. Jag föredrar bananer över äpplen förresten.",
    video: "dQw4w9WgXcQ?si=7KskIbgdUbf3mNj7",
  },
];

//Displaying liked movies and allowing removal
function LikedMoviesView(props) {
  const numberOflikes = likedMovies.length;

  function movieClickACB() {
    // props.functionsnamnet(movie);
    // window.location.hash = "#/details";
    openModal();
  }

  let navigate = useNavigate();

  function windowToSwipe(evt) {
    navigate("/moviepage");
  }

  function windowToStartPage(evt) {
    navigate("/startpage");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    // console.log("Opening details view for " + movie.original_title)
    setIsModalOpen(true);
  }

  useEffect(() => {
    console.log("Modal state after update: " + isModalOpen);
  }, [isModalOpen]);

  function closeModal() {
    console.log(isModalOpen);
    setIsModalOpen(false);
    console.log(isModalOpen);
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
      }}
    >
      <button class="shadow-inner absolute left-2 top-7 w-40">
        <img
          onClick={windowToStartPage}
          src={logo}
          alt="Logo icon"
          style={{ filter: "drop-shadow(0 0 0.2rem #C772ED)" }}
        />
      </button>
      <h1
        className="text-3xl font-thin font-sans mt-8"
        style={{
          color: "#FF7272",
          textShadow: "0px 0px 4px #FF3131",
          dispay: "inline-block",
        }}
      >
        Your Likes
      </h1>
      <h2
        className="text-3xl font-thin font-sans mt-1 mr-10"
        style={{
          color: "#FF7272",
          textShadow: "0px 0px 4px #FF3131",
          dispay: "inline-block",
        }}
      >
        {numberOflikes}
      </h2>
      <img
        src={likebutton}
        alt="Heart icon"
        className="absolute top-12 w-11 mt-5 ml-7"
        style={{ dispay: "inline-block" }}
      />
      <span className="spanButton" onClick={windowToSwipe}>
        <h1
          className="text-3xl font-thin font-sans absolute top-5 right-32 w-11 mt-5"
          style={{ color: "#FFE370", textShadow: "0px 0px 4px #FFE370" }}
        >
          Swipe
        </h1>
        <img
          src={fire}
          alt="Fire icon"
          className="absolute right-14 top-7 w-10"
        />
      </span>

      <div className="flex flex-wrap justify-start gap-20 m-20">
        {likedMovies.map((movie) => renderMovie(movie))}
      </div>
    </div>
  );

  // Function to render individual movie items
  function renderMovie(movie) {
    const image_url = "https://image.tmdb.org/t/p/w780/" + movie.poster_path;

    return (
      <div key={movie.id} className="mb-2 animate-fade-up animate-delay-200">
        {/* Display movie details */}
        <img
          onClick={() => movieClickACB(movie)}
          src={image_url}
          alt={movie.original_title}
          className="rounded-lg shadow-lg"
          style={{
            filter: "drop-shadow(0 0 0.75rem #D300FE)",
            cursor: "pointer",
          }}
          width="190"
        />

        {isModalOpen && (
          <DetailModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            movie={movie}
          />
        )}
      </div>
    );
  }
}

export default LikedMoviesView;
