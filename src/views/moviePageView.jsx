import "../style.css";
import { useNavigate } from "react-router-dom";
import dislikebutton from "../images/dislikebutton.png";
import likebutton from "../images/likebutton.png";
import trailer from "../images/trailer.png";
import logo from "../images/logo.png";
import React, { useState } from "react";
import 'flowbite';
import VideoModal from './videoModal';

function MoviePageView(props) {
  /*
  var image_url =
    "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
    props.movieData.poster_path;
  */
  var image_url =
    "https://image.tmdb.org/t/p/w780/" + props.movieData.poster_path;

  var video_url = "https://www.youtube.com/embed/" + props.movieData.video;

  props.movieData.cast = props.movieData.cast.slice(0, 4);

  function likeACB(evt) {

    props.onLike();
  }

  function dislikeACB(evt) {
    props.onDislike();
  }

  let navigate = useNavigate();

  function windowToLikes(evt) {
    navigate("/yourlikes");
  }

  function windowToStartPage(evt) {
    navigate("/");
  }

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
    <div className="snap-y snap-mandatory overflow-scroll h-screen w-screen bg-fixed animate-fade"
    style={{
      background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
    }}>

    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* First column */}
      <div className="lg:col-span-1 h-screen flex flex-col justify-center items-center">
      <img
              className="h-2/3 max-w-full poster-edge-gradient shadow-lg"
              style={{ filter: "drop-shadow(0 0 1.5em #412EBB)" }}
              src={image_url}
              alt="Movie poster"
            />
      <div className="flex justify-center items-start space-x-6 p-5">
            <button onClick={dislikeACB} className=" w-20 h-20 rotate-45">
              <img src={dislikebutton} className="hover:animate-jump"  alt="Dislike" />
            </button>
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
            <button onClick={likeACB} className="w-24 h-24 -mt-2">
              <img src={likebutton} className="hover:animate-jump" alt="Like" />
            </button>
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
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
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
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
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
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
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
                style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
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
<button 
        className=" xl:flex shadow-inner absolute md:left-2 top-2 md:top-7 w-16"
        style={{ filter: "drop-shadow(0 0 0.2rem #C772ED)" }}
        alt="Logo icon"
      >
        <img onClick={windowToStartPage} src={logo} />
      </button>
      <button
      onClick={windowToLikes}
      className="text-3xl font-thin font-sans absolute right-2 md:right-11 top-1 md:top-7 lg:top-10"
      style={{ color: "#FF7272", textShadow: "0px 0px 4px #FF3131" }}
    >
      {/* Hidden on smaller screens */}
      <span className="hidden lg:inline">Your likes</span>
      {/* Heart icon */}
      <span> ♡</span>
    </button>

    </div>
  );
}

export default MoviePageView;
