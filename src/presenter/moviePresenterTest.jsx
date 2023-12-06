import MovieView from "../views/movieViewTest.jsx";
import { observer } from "mobx-react-lite";

export default observer(function Movie(props) {
  function newMovieHandlerACB(params) {
    props.model.doRandomMovieSearch(props.model.searchParams);
  }

  const promiseState = props.model.currentMoviePromiseState;

  if (promiseState.promise == null) {
    return "no data";
  } else {
    if (!promiseState.error) {
      if (promiseState.data) {
        return (
          <MovieView
            movieData={promiseState.data}
            onButton={newMovieHandlerACB}
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
