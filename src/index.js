import ReactRoot from './presenter/root.jsx';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ReactRoot/>);