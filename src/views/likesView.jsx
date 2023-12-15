import { removeMovieFromLiked } from "../presenter/likesPresenter.jsx";
import likebutton from "../images/likebutton.png";
import { useSelector, useDispatch } from 'react-redux';
import fire from "../images/fire.png";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";



//Example on API
const Likedmovieslist = [
  {
    id: 1,
    title: "Avatar",
    picture:
      "https://lumiere-a.akamaihd.net/v1/images/p_disney_wish_799_v2_9b93081b.jpeg?region=0%2C0%2C540%2C810",
  },
  {
    id: 2,
    title: "Aquaman",
    picture:
      "https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_avatarthewayofwater_streamingupdate_2096_0908fa1b.jpeg",
  },
  {
    id: 3,
    title: "Scary movie",
    picture:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00313411-kzwupkjajz-portrait.jpg",
  },

  {
    id: 4,
    title: "Avatar",
    picture:
      "https://lumiere-a.akamaihd.net/v1/images/p_disney_wish_799_v2_9b93081b.jpeg?region=0%2C0%2C540%2C810",
  },
  {
    id: 5,
    title: "Aquaman",
    picture:
      "https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_avatarthewayofwater_streamingupdate_2096_0908fa1b.jpeg",
  },
  {
    id: 6,
    title: "Scary movie",
    picture:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00313411-kzwupkjajz-portrait.jpg",
  },
  {
    id: 7,
    title: "Avatar",
    picture:
      "https://lumiere-a.akamaihd.net/v1/images/p_disney_wish_799_v2_9b93081b.jpeg?region=0%2C0%2C540%2C810",
  },
];

//Displaying liked movies and allowing removal
function LikedMoviesView(props) {
  const numberOflikes = Likedmovieslist.length;

  function movieClickACB(movie) {
    props.functionsnamnet(movie);
    window.location.hash = "#/details";
  }
  let navigate = useNavigate();

  function windowToSwipe(evt) {
    navigate("/moviepage");
  }

  function windowToStartPage(evt) {
    navigate("/login");
  }

  return (
    
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
      }}
    >
      <h1
        className="text-3xl font-thin font-sans mt-8"
        style={{ color: "#FF7272", textShadow: "0px 0px 4px #FF3131" }}
      >
        Your Likes
      </h1>
      <h2
        className="text-3xl font-thin font-sans mt-1 mr-10"
        style={{ color: "#FF7272", textShadow: "0px 0px 4px #FF3131" }}
      >
        {numberOflikes}
      </h2>
      <img
        src={likebutton}
        alt="Heart icon"
        className="absolute top-12 w-11 mt-5 ml-7"
      />
      <span className="spanButton" onClick={windowToSwipe} >
        <h1
          className="text-3xl font-thin font-sans absolute top-5 right-32 w-11 mt-5"
          style={{ color: "#FFE370", textShadow: "0px 0px 4px #FFE370" }}
        >
          Swipe
        </h1>
        <img
          src={fire}
          alt="Fire icon"
          className="absolute right-14 top-7 w-10"
        />
      </span>
      <button><img
        onClick={windowToStartPage}
        src={logo}
        alt="Logo icon"
        class="shadow-inner absolute left-2 top-7 w-40"
        style={{ filter: "drop-shadow(0 0 0.2rem #C772ED)" }}
      /></button>
      <div className="flex flex-wrap justify-start gap-20 m-20">
        {Likedmovieslist.map((movie) => renderMovie(movie))}
      </div>
    </div>
  );

  // Function to render individual movie items
  function renderMovie(movie) {
    return (
      <div key={movie.id} onClick={() => movieClickACB(movie)} className="mb-2 animate-fade-up animate-delay-200">
        {/* Display movie details */}
        <img
          src={movie.picture}
          alt={movie.title}
          className="rounded-lg shadow-lg"
          style={{ filter: "drop-shadow(0 0 0.75rem #D300FE)" }}
          width="190"
        />
      </div>
    );
  }
}

export default LikedMoviesView;
