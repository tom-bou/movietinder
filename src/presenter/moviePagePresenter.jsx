import { observer } from "mobx-react-lite";
import MoviePageView from "../views/moviePageView.jsx";
import loadingpinkblue from "../images/loadingpinkblue.gif";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { likeMovie } from "../userSlice.js";


export default observer(function MoviePagePresenter(props) {
  const userDetails = useSelector((state) => state.user.details);

  const dispatch = useDispatch();

  function handleLikeACB(evt) {
    props.firebaseModel.saveLikedMovie(userDetails.userId, props.model.currentMoviePromiseState.data.id)
    dispatch(likeMovie(props.model.currentMoviePromiseState.data.id));
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
          <div className="snap-y snap-mandatory overflow-scroll h-screen w-screen bg-fixed animate-fade"
          style={{
            background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
          }}>
      
          <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            {/* First column */}
            <div className="lg:col-span-1 h-screen flex flex-col justify-center items-center">
            <img
                    className="w-1/4 lg:w-1/5"
                    src={loadingpinkblue}
                    alt="Loading gif"
                  />
      
            
      
            
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
              <img src={logo} />
            </button>
            <button
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
    } else {
      return promiseState.error.toString();
    }
  }
});