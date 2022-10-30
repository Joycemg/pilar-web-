import { createStore } from 'redux';
import { appReducer } from './reducers/appRedux';

const store = createStore(appReducer);

export default store;
