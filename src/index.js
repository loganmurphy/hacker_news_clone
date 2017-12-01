import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import ConnectedApp from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store.js';

ReactDOM.render(<ConnectedApp store={store}/>, document.getElementById('root'));
registerServiceWorker();
