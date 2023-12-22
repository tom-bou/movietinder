
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import likebutton from "../images/likebutton.png";
import fire from "../images/fire.png";
import logo from "../images/logo.png";
import DetailModal from './detailModal';
import { toJS } from 'mobx';

function LikedMoviesView(props) {
  const likedMoviesIds = useSelector((state) => state.user.details.likedMovies);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let navigate = useNavigate();

  // Navigate functions
  function windowToSwipe() {
    navigate("/moviepage");
  }

  function windowToStartPage() {
    navigate("/startpage");
  }

  // Modal control functions
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // Fetching liked movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const promises = likedMoviesIds.map((movieId) => props.model.doMovieSearch(movieId));
        let movies = await Promise.all(promises.map(result => result.promise));
        movies = movies.map(movie => toJS(movie));
        console.log(movies);
        setLikedMovies(movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [likedMoviesIds, props.model]);

  // Function to render individual movie items
  function renderMovie(movie) {
    const image_url = "https://image.tmdb.org/t/p/w780/" + movie.poster_path;
    return (
      <div key={movie.id} className="mb-2 animate-fade-up animate-delay-200">
        <img
          onClick={() => openModal()}
          src={image_url}
          alt={movie.original_title}
          className="rounded-lg shadow-lg"
          style={{ filter: "drop-shadow(0 0 0.75rem #D300FE)", cursor: "pointer" }}
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
