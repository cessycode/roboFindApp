import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {searchRobots, requestRobots} from './reducers'; // becomes state in App.js
import './index.css';
import 'tachyons';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();

const rootReducer = combineReducers({searchRobots, requestRobots}); 
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware,logger));
                                              // thunkMiddleware - catches a higher order function
                                              // used for redux async actions

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>  
        <App />
      </Provider> 
    </React.StrictMode>,
  document.getElementById('root')
);

// IMPT: <Provider store = {store}> passes down store as props to App.js down to all other components under it

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
