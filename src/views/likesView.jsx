import likebutton from "../images/likebutton.png";
import fire from "../images/fire.png";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DetailModal from "./detailModal";

const likedMovies = [
  {
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
  {
    id: 230,
    original_title: "DonasdasdCry",
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

function LikedMoviesView(props) {
  const numberOflikes = likedMovies.length;

  let navigate = useNavigate();

  function windowToSwipe(evt) {
    navigate("/moviepage");
  }

  function windowToStartPage(evt) {
    navigate("/");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function openModal(movie) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  useEffect(() => {}, [isModalOpen]);

  function closeModal() {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{
        background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
      }}
    >
<button class="shadow-inner absolute md:left-2 md:top-7 top-2 left-2 top-7 md:w-40 w-16">
        <img    
        className=" xl:flex shadow-inner absolute"    
          onClick={windowToStartPage}
          src={logo}
          alt="Logo icon"
          style={{ filter: "drop-shadow(0 0 0.2rem #C772ED)" }}
        />
      </button>
      <div className="text-center">
        <h1
          className="text-3xl font-thin font-sans mt-8"
          style={{
            marginLeft: "-40px",
            color: "#FF7272",
            textShadow: "0px 0px 4px #FF3131",
            dispay: "inline-block",
          }}
        >
          Your Likes
          <div className="inline">
            {" "}
            <img
              src={likebutton}
              alt="Heart icon"
              className="absolute w-9 ml-2 inline"
            />
          </div>
        </h1>

        <h2
          className="text-3xl font-thin font-sans mt-1"
          style={{
            color: "#FF7272",
            textShadow: "0px 0px 4px #FF3131",
            dispay: "inline-block",
          }}
        >
          {numberOflikes}
        </h2>
      </div>
      <span className="spanButton" onClick={windowToSwipe}>
        <h1
          className="text-3xl font-thin font-sans absolute top-5 right-32 w-11 mt-5 hidden lg:inline"
          style={{ color: "#FFE370", textShadow: "0px 0px 4px #FFE370" }}
        >
          Swipe
        </h1>
        <img
          src={fire}
          alt="Fire icon"
          className="absolute right-3 lg:right-14 top-7 w-7 lg:w-10"
        />
      </span>

      <div className="flex flex-wrap justify-start gap-20 m-20 justify-center place-content-center">
        {likedMovies.map(renderMovieCB)}
      </div>
      {isModalOpen && (
        <DetailModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          movie={selectedMovie}
        />
      )}
    </div>
  );

  function renderMovieCB(movie) {
    const image_url = "https://image.tmdb.org/t/p/w780/" + movie.poster_path;

    return (
      <div key={movie.id} className="mb-2 animate-fade-up animate-delay-200">
        <img
          onClick={() => openModal(movie)}
          src={image_url}
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
}

export default LikedMoviesView;
