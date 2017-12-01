
import { createStore } from 'redux';
import content from './reducers';

var store = createStore(content);

export default store;
