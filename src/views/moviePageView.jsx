import "../style.css";
import { useNavigate } from 'react-router-dom';
import dislikebutton from "../images/dislikebutton.png";
import likebutton from "../images/likebutton.png";
import trailer from "../images/trailer.png";
import logo from "../images/logo.png";

function MoviePageView(props) {
  /*
  var image_url =
    "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
    props.movieData.poster_path;
  */
  var image_url =
  "https://image.tmdb.org/t/p/w780/" +
  props.movieData.poster_path;

  var video_url = "https://www.youtube.com/embed/" + props.movieData.video;

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
  return (
    <div className="flex min-h-screen max-h-screen bg-custom-purple relative" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
      <div className="p-1 flex-column w-1/2 xl:pl-10"> {/* Leftmost column */}
        <div className="h-2/3 flex items-center justify-center p-1 sm:pt-10 xl:h-3/4 xl:pt-10"> {/* Upper left */}
          <div className="flex items-center justify-center h-full w-full max-h-fit max-w-fit"> {/* Div surrounding image element */}
            <img
              className="max-h-full poster-edge-gradient"
              src={image_url}
              alt="Movie poster"
            />
          </div>
        </div>
        <div className=""> {/* Lower left */}  
          <div className="flex justify-center items-start space-x-6 p-5">
            <button onClick={dislikeACB} className="w-20 h-20 rotate-45">
              <img src={dislikebutton} alt="Dislike"/>
            </button>
            <button className="w-20 h-20">
              <img src={trailer} alt="Trailer"/>
            </button>
            <button onClick={likeACB} className="w-24 h-24 -mt-2">
            <img src={likebutton} alt="Like"/>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-column w-1/2"> {/* Rightmost column */}
        <div className="h-16 pr-3 flex justify-end"> {/* Upper right */}
          <button onClick={windowToLikes}  className="text-3xl font-thin font-sans" style={{ color: "#FF7272", textShadow: "0px 0px 4px #FF3131" }}>
            Your likes ♡
          </button>
        </div>
        <div className="h-1/2 flex m-auto p-2.5 mr-10 xl:-ml-12"> {/* Middle right */}
          <div className="w-full h-full grid grid-cols-2 gap-2 text-center lg:pt-5">
            <div className="p-2 justify-center">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>TITLE</p>
              <p className="text-category-body font-thin font-sans">{props.movieData.original_title}</p>
            </div>
            <div className="p-2 justify-center">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>GENRE</p>
              <p className="text-category-body font-thin font-sans">{genresToString(props.movieData.genres)}</p>
            </div>
            <div className="p-2 justify-center">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>ACTORS</p>
              <p className="text-category-body font-thin font-sans">
                First Actor, Second Actor, Third Actor
              </p>
            </div>
            <div className="p-2 justify-center">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>DIRECTORS</p>
              <p className="text-category-body font-thin font-sans">Director One, Director Two</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 pr-10 mr-6 xl:-ml-12"> {/* Lower right */}
          <p className="text-center shadow-white-glow text-3xl font-bold font-sans"  style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>STORYLINE</p>
          <p className="text-white text-center text-lg font-thin font-sans">
          {props.movieData.overview}
          </p>
        </div>
      </div>
      <img src={logo} alt="Logo icon" className="hidden xl:flex shadow-inner absolute top-7 w-40"  style={{ filter: 'drop-shadow(0 0 0.2rem #C772ED)' }} />
    </div>
  );

  function genresToString(genresArray) {
    const genreString = genresArray.reduce((accumulator, currentVal, index) => {
      if (index == 0) {
        return accumulator + currentVal.name
      } else {
        return accumulator + ", " + currentVal.name
      }
    }, "");
    return genreString;
  }
}

export default MoviePageView;