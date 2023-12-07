import "../style.css";
import { useNavigate } from 'react-router-dom';
import dislikebutton from "../images/dislikebutton.png";
import likebutton from "../images/likebutton.png";
import trailer from "../images/trailer.png";
import logo from "../images/logo.png";

function MoviePageView(props) {
  var image_url =
    "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
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
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
      <div className="p-1 flex-column w-1/2">
        {" "}
        {/* Leftmost column */}
        <div className="h-2/3 flex items-center justify-center p-6">
          {" "}
          {/* Upper left */}
          <div className="h-full w-full">
            <img
              className="absolute top-20 relative z-10 m-auto max-h-full poster-edge-gradient"
              src={image_url}
              alt="Movie poster"
            />
          </div>
            <div className="z-0 bg-gradient-to-br from-blue-900 via-violet-700 blur-md to-pink-800 rounded-lg absolute top-24 left-15 right-15 bottom-15 " style={{ width: '330px', height:'485px' }}></div>
          {" "}
          {/* Lower left */}
          <div className="flex justify-center absolute bottom-24 left-48 items-start space-x-6 p-5">
            <button onClick={dislikeACB} className="w-20 h-20 rotate-45">
              <img src={dislikebutton} alt="Dislike"/>
            </button>
            <button className="w-20 h-20">
              <img src={trailer} alt="Trailer"/>
            </button>
            <button onClick={likeACB} className=" w-24 h-20">
              <img src={likebutton} alt="Like"/>
            </button>
          </div>
        </div>
      </div>
      <div className="p-1 flex-column w-1/2">
        {" "}
        {/* Rightmost column */}
        <div className="h-16 flex justify-end p-5">
          {" "}
          {/* Upper right */}
          <button onClick={windowToLikes}  className="text-3xl font-thin font-sans" style={{ color: "#FF7272", textShadow: "0px 0px 4px #FF3131" }}>
            Your likes ♡
          </button>
        </div>
        <div className="h-1/2 flex m-auto p-2.5">
          {" "}
          {/* Middle right */}
          <div className="w-full h-full grid grid-cols-2 gap-2 text-center">
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>TITLE</p>
              <p className="text-category-body font-thin font-sans">{props.movieData.original_title}</p>
            </div>
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>GENRE</p>
              <p className="text-category-body font-thin font-sans">Science Fiction</p>
            </div>
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>ACTORS</p>
              <p className="text-category-body font-thin font-sans">
                Adam Driver, Another Actor, And One More Actor
              </p>
            </div>
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>DIRECTORS</p>
              <p className="text-category-body font-thin font-sans">Scott Beck, Bryan Woods</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {" "}
          {/* Lower right */}
          <p className="text-center shadow-white-glow text-3xl font-bold font-sans"  style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>STORYLINE</p>
          <p className="text-white text-center text-md font-thin font-sans">
          {props.movieData.overview}
          </p>
        </div>
      </div>
      <img src={logo} alt="Logo icon" class="shadow-inner absolute left-2 top-7 w-40"  style={{ filter: 'drop-shadow(0 0 0.2rem #C772ED)' }} />
    </div>
  );
}

export default MoviePageView;
