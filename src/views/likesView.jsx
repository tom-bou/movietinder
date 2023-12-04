
import {removeMovieFromLiked }from '../presenter/likesPresenter.jsx';
import likebutton from "../images/likebutton.png"
//Example on API
const Likedmovieslist = [
    {
      id: 1,
      title: 'Avatar',
      picture: 'https://lumiere-a.akamaihd.net/v1/images/p_disney_wish_799_v2_9b93081b.jpeg?region=0%2C0%2C540%2C810',
    },
    {
      id: 2,
      title: 'Aquaman',
      picture: 'https://lumiere-a.akamaihd.net/v1/images/p_disneymovies_avatarthewayofwater_streamingupdate_2096_0908fa1b.jpeg',
    },
    {
      id: 3,
      title: 'Scary movie',
      picture: 'https://assets-in.bmscdn.com/discovery-catalog/events/et00313411-kzwupkjajz-portrait.jpg',
    },
];
  

//Displaying liked movies and allowing removal
function LikedMoviesView(props) {

    const numberOflikes = Likedmovieslist.length

    function movieClickACB(movie) {
        props.functionsnamnet(movie);
        window.location.hash = "#/details";
    }

    return (
      <div>
        <h1>Your Likes</h1>
        <h2>{numberOflikes}</h2>
        {/* Heart icon */}
        <img src={likebutton} alt="Heart icon" />
        {/* Mapping over moviesWithPictures and generating elements for each movie */}
        {Likedmovieslist.map(movie => renderMovie(movie))}
      </div>
    );
  
    // Function to render individual movie items
    function renderMovie(movie) {
      return (
        <div key={movie.id} onClick={() => movieClickACB(movie)}>
          {/* Display movie details */}
          <img src={movie.picture} alt={movie.title} width= "200" />
        </div>
      );
    }
  }
  
  export default LikedMoviesView;