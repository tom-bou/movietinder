import { observer } from "mobx-react-lite";
import MoviePageView from "../views/moviePageView.jsx";
import loadingpinkblue from "../images/loadingpinkblue.gif"
import logo from "../images/logo.png";
import dislikebutton from "../images/dislikebutton.png";
import likebutton from "../images/likebutton.png";
import trailer from "../images/trailer.png";
import moviegif from "../images/moviegif.gif";

export default observer(function MoviePagePresenter(props) {
  function handleLikeACB(evt) {
    props.model.likeMovie(props.model.currentMoviePromiseState.data);
  }

  function handleDislikeACB(evt) {
    props.model.dislikeMovie(props.model.currentMoviePromiseState.data);
  }

  const promiseState = props.model.currentMoviePromiseState;

  if (promiseState.promise == null) {
    return "no data";
  } else {
    if (!promiseState.error) {
      if (promiseState.data) {
        return (
          <MoviePageView
            movieData={promiseState.data}
            onLike={handleLikeACB}
            onDislike={handleDislikeACB}
          />
        );
      } else {
        return (
          <div className="flex min-h-screen max-h-screen bg-custom-purple relative" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
            <div className="p-1 xl:mt-40 flex-column w-1/2 xl:pl-10"> {/* Leftmost column */}
              <div className="h-2/3 flex items-center justify-center p-1 sm:pt-10 xl:h-3/4 xl:pt-10"> {/* Upper left */}
                <div className="flex items-center justify-center h-full w-full max-h-fit max-w-fit"> {/* Div surrounding image element */}
                  <img
                    className="w-1/4 lg:w-1/5"
                    src={loadingpinkblue}
                    alt="Loading gif"
                  />
                </div>
              </div>
              <div className="h-1/3"> {/* Lower left */}  
                <div className="flex justify-center items-start space-x-6 p-5">
                  <button className="w-20 h-20 rotate-45">
                    <img src={dislikebutton} alt="Dislike"/>
                  </button>
                  <button className="w-20 h-20">
                    <img src={trailer} alt="Trailer"/>
                  </button>
                  <button className="w-24 h-24 -mt-2">
                  <img src={likebutton} alt="Like"/>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-column w-1/2"> {/* Rightmost column */}
              <div className="h-16 pr-3 flex justify-end"> {/* Upper right */}
                <button className="text-3xl font-thin font-sans" style={{ color: "#FF7272", textShadow: "0px 0px 4px #FF3131" }}>
                  Your likes ♡
                </button>
              </div>
              <div className="h-1/2 flex m-auto p-2.5 mr-10 xl:-ml-12"> {/* Middle right */}
                <div className="w-full h-full grid grid-cols-2 gap-2 text-center lg:pt-5">
                  <div className="p-2 justify-center">
                    <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>TITLE</p>
                    <p className="text-category-body font-thin font-sans"></p>
                  </div>
                  <div className="p-2 justify-center">
                    <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>GENRE</p>
                    <p className="text-category-body font-thin font-sans"></p>
                  </div>
                  <div className="p-2 justify-center">
                    <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>ACTORS</p>
                    <p className="text-category-body font-thin font-sans">

                    </p>
                  </div>
                  <div className="p-2 justify-center">
                    <p className="shadow-white-glow text-3xl font-bold font-sans" style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>DIRECTOR</p>
                    <p className="text-category-body font-thin font-sans"></p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 pr-10 mr-6 xl:-ml-12"> {/* Lower right */}
                <p className="text-center shadow-white-glow text-3xl font-bold font-sans"  style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}>STORYLINE</p>
                <p className="text-white text-center text-lg font-thin font-sans">
                </p>
              </div>
            </div>
            <img src={logo} alt="Logo icon" className="hidden xl:flex shadow-inner absolute top-7 w-40"  style={{ filter: 'drop-shadow(0 0 0.2rem #C772ED)' }} />
          </div>
        );
      }
    } else {
      return promiseState.error.toString();
    }
  }
});
