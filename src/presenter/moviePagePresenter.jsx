import { observer } from "mobx-react-lite";
import MoviePageView from "../views/moviePageView.jsx";

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
          <img
            src="https://brfenergi.se/iprog/loading.gif"
            alt="Loading..."
          ></img>
        );
      }
    } else {
      return promiseState.error.toString();
    }
  }
});
