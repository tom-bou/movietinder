import { observer } from 'mobx-react-lite';
import Movie from './moviePresenterTest.jsx';

const ReactRoot = observer(({ model }) => {
    return (
      <div className="">
        <Movie model={model} />
      </div>
    );
    }
  );
  
  export default ReactRoot;