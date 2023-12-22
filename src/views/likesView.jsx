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
      setSessionMembers(await props.firebaseModel.getSessionMembers(sessionId));

      let memberLikes = sessionMembers.map((member) => fetchMovies(member));
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
    }, [props.firebaseModel, props.model, userId, sessionId, sessionMembers]);

  // Function to render individual movie items
  function renderMovie(movie) {
    console.log(movie.original_title);
    const image_url = "https://image.tmdb.org/t/p/w780/" + movie.poster_path;
    return (
      <div key={movie.id} className="mb-2 animate-fade-up animate-delay-200">
        <img
          onClick={() => openModal(movie)}
          src={image_url}
          alt={movie.original_title}
          className="rounded-lg shadow-lg"
          style={{ filter: "drop-shadow(0 0 0.75rem #D300FE)", cursor: "pointer" }}
          width="190"
        />

        {isModalOpen && currentMovie && (
          <DetailModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            movie={currentMovie}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
      }}
    >
      <div className="flex flex-col">
      <button className=" absolute left-5 top-4 shadow-inner w-40" onClick={windowToStartPage}>
        <img
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
          display: "inline-block",
        }}
      >
        Your Likes
      </h1>
      <h2
        className="text-3xl font-thin font-sans mt-1 mr-10"
        style={{
          color: "#FF7272",
          textShadow: "0px 0px 4px #FF3131",
          display: "inline-block",
        }}
      >
        {likedMovies.length}
      </h2>
      <img
        src={likebutton}
        alt="Heart icon"
        className="absolute top-12 w-11 mt-5 ml-7"
        style={{ display: "inline-block" }}
      />
      </div>
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

      <div className="flex flex-wrap justify-center gap-20 m-20">
        {likedMovies.map((movie) => renderMovie(movie))}
      </div>
      {sessionMembers.length > 1 && (<div><h1
        className="text-3xl font-thin font-sans mt-8"
        style={{
          color: "#FF7272",
          textShadow: "0px 0px 4px #FF3131",
          display: "inline-block",
        }}
      >
        Session Likes
      </h1>
      <h2
        className="relative top-11 text-3xl font-thin font-sans mt-1 mr-10"
        style={{
          color: "#FF7272",
          textShadow: "0px 0px 4px #FF3131",
          display: "inline-block",
        }}
      >
        {sessionLikes.length}
      </h2>
      <img
        src={likebutton}
        alt="Heart icon"
        className="relative top-10 right-10 w-11 mt-5 ml-7"
        style={{ display: "inline-block" }}
      />
      <div className="flex flex-wrap justify-start gap-20 m-20">
        {sessionLikes.map((movie) => renderMovie(movie))}
      </div>
      </div>
      )}
    </div>
    
  );
}

export default LikedMoviesView;