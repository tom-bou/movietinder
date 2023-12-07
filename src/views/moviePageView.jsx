import "../style.css";
import { useNavigate } from 'react-router-dom';

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
    <div className="flex min-h-screen bg-custom-purple">
      <div className="p-1 flex-column w-1/2">
        {" "}
        {/* Leftmost column */}
        <div className="h-2/3 flex items-center justify-center p-6">
          {" "}
          {/* Upper left */}
          <div className="h-full w-full">
            <img
              className="m-auto max-h-full poster-edge-gradient"
              src={image_url}
              alt="Movie poster"
            />
          </div>
        </div>
        <div className="h-1/3">
          {" "}
          {/* Lower left */}
          <div className="flex justify-center items-start space-x-6 p-5">
            <button onClick={dislikeACB} className="bg-red-500 w-20 h-20 rounded-lg aspect-square">
              Don't like
            </button>
            <button className="bg-blue-500 w-20 h-20 rounded-lg aspect-square">
              View trailer
            </button>
            <button
              onClick={likeACB}
              className="bg-green-500 w-20 h-20 rounded-lg aspect-square"
            >
              Like
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
          <button onClick={windowToLikes} className="shadow-red-glow text-red-500 text-xl">
            Your likes
          </button>
        </div>
        <div className="h-1/2 flex m-auto p-2.5">
          {" "}
          {/* Middle right */}
          <div className="w-full h-full grid grid-cols-2 gap-2 text-center">
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-category-title">Title</p>
              <p className="text-category-body">{props.movieData.original_title}</p>
            </div>
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-category-title">Genre</p>
              <p className="text-category-body">Science Fiction</p>
            </div>
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-category-title">Actors</p>
              <p className="text-category-body">
                Adam Driver, Another Actor, And One More Actor
              </p>
            </div>
            <div className="p-2 m-auto">
              <p className="shadow-white-glow text-category-title">Directors</p>
              <p className="text-category-body">Scott Beck, Bryan Woods</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {" "}
          {/* Lower right */}
          <p className="text-center text-category-title">Storyline</p>
          <p className="text-white text-md">
          {props.movieData.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoviePageView;
