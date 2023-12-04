import "../style.css";

function MovieView(props) {
  // console.log(props.movieData);
  var image_url =
    "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +
    props.movieData.poster_path;

  var video_url = "https://www.youtube.com/embed/" + props.movieData.video;

  function buttonEventHandlerACB(evt) {
    props.onButton();
  }
  
  return (
    <div>
      <img src={image_url} />
      <iframe width="420" height="315" src={video_url}></iframe>
      <div>This is the title: {props.movieData.original_title}</div>

      <div>{props.movieData.overview}</div>
      <button className="newMovieButton" onClick={buttonEventHandlerACB}>New Movie!</button>
    </div>
  );
}

export default MovieView;
