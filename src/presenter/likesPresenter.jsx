
import LikedMoviesView from "../views/likesView";

export default observer(function LikesPresenter(props) {
  return (
    <div>
      <LikedMoviesView model={props.model}/>
    </div>
  );
});
