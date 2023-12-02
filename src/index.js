import ReactRoot from './presenter/root.jsx';
import { createRoot } from 'react-dom/client';
import Firebase from './models/firebaseModel.js';

const container = document.getElementById('root');
const FirebaseModel = new Firebase();
const root = createRoot(container);
root.render(<ReactRoot firebaseModel={FirebaseModel}/>);