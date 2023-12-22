import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import likebutton from "../images/likebutton.png";
import fire from "../images/fire.png";
import logo from "../images/logo.png";
import DetailModal from "./detailModal";
import { toJS } from "mobx";

function LikedMoviesView(props) {
  const [likedMovies, setLikedMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [sessionLikes, setSessionLikes] = useState([]);
  const [sessionMembers, setSessionMembers] = useState([]);

  const sessionId = useSelector((state) => state.session.sessionId);
  const userId = useSelector((state) => state.user.details.userId);

  let navigate = useNavigate();

  // Navigate functions
  function windowToSwipe() {
    navigate("/moviepage");
  }

  function windowToStartPage() {
    navigate("/");
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
  useEffect(() => {
    const fetchMovies = async (userId) => {
      try {
        const likedMoviesIds = await props.firebaseModel.getLikedMovies(userId);

        const promises = likedMoviesIds.map((movieId) => props.model.doMovieSearch(movieId));
        let movies = await Promise.all(promises.map(result => result.promise));
        movies = movies.map(movie => toJS(movie));

        
        return movies
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };


    const fetchMoviesAndSetState = async () => {
      const movies = await fetchMovies(userId);
      setLikedMovies(movies);
    };
  
    fetchMoviesAndSetState();
    
    const fetchSessionLikes = async (sessionId) => {
      const members = await props.firebaseModel.getSessionMembers(sessionId);
      setSessionMembers(members);
    
      let memberLikes = members.map((member) => fetchMovies(member));
      let likesArrays = await Promise.all(memberLikes);
      console.log(likesArrays);
      const intersection = likesArrays.reduce((accumulator, currentArray) => {
        return accumulator.filter(accElement =>
          currentArray.some(currElement => currElement.id === accElement.id)
        );
      }, likesArrays[0] || []);
      console.log(intersection);
      
      // 'intersection' now contains the common elements between all member likes
      setSessionLikes(intersection);
    }
    
    
    if (sessionId) {
      fetchSessionLikes(sessionId);
    }
    }, [props.firebaseModel, props.model, userId, sessionId]);


  function renderMovie(movie) {
    console.log(movie.original_title);
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
          {likedMovies.length}
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-20 m-20">
        {likedMovies.map((movie) => renderMovie(movie))}
      </div>

      {sessionId && (
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
            {sessionLikes.length}
          </h2>

          <div className="flex flex-wrap justify-center gap-20 m-20">
            {sessionLikes.map((movie) => renderMovie(movie))}
          </div>
        </div>

      )}
    </div>
  );
}

export default LikedMoviesView;
