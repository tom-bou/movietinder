import { observer } from 'mobx-react-lite';
import MoviePosterView from '../views/moviePosterView';

const ReactRoot = observer(({ model }) => {
    return (
      <div className="">
        <MoviePosterView />
      </div>
    );
    }
  );
  
  export default ReactRoot;