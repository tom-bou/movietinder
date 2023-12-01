import { observer } from 'mobx-react-lite';
import MoviePageView from '../views/moviePageView';

const ReactRoot = observer(({ model }) => {
    return (
      <div>
        <MoviePageView />
      </div>
    );
    }
  );
  
  export default ReactRoot;