import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from "./reducer/reducer"




const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer , composeEnhancer(applyMiddleware(thunk)));



export default store;