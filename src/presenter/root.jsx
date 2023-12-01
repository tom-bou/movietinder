import { observer } from 'mobx-react-lite';
import MoviePosterView from '../views/moviePosterView';

const ReactRoot = observer(({ model }) => {
    return (
      <div>
        <MoviePosterView />
      </div>
    );
    }
  );
  
  export default ReactRoot;