import { observer } from "mobx-react-lite";
import MoviePageView from "../views/moviePageView.jsx";
import loading from "../images/loading.gif"
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
          <div className="flex min-h-screen" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
            <div className="p-1 flex-column w-1/2">
              <div className="h-2/3 flex items-center justify-center p-6">
                <div className="z-0 bg-gradient-to-br from-blue-900 via-violet-700 blur-md to-pink-800 rounded-lg absolute top-24 left-15 right-15 bottom-15 " style={{ width: '330px', height:'485px' }}></div>
              <div className="flex justify-center absolute bottom-24 left-48 items-start space-x-6 p-5">
                <button className="w-20 h-20 rotate-45"> <img src={dislikebutton} alt="Dislike"/></button>
                <button className="w-20 h-20"><img src={trailer} alt="Trailer"/></button>
                <button className=" w-24 h-20"><img src={likebutton} alt="Like"/></button>
            </div>
            </div>
            <img className="w-36 absolute top-64 right-96" src="https://www.uokajk.edu.pk/data/ecounselling/assets/chat_info_icon.gif" />
            

            </div>

          <img src={logo} alt="Logo icon" class="shadow-inner absolute left-2 top-7 w-40"  style={{ filter: 'drop-shadow(0 0 0.2rem #C772ED)' }} />  

          </div>
        );
      }
    } else {
      return promiseState.error.toString();
    }
  }
});
