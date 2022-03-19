import {combineReducers} from 'redux';
import cardDeckReducer from './cardDeck';
import cardPlayerReducer from './cardPlayer';

const rootReducer = combineReducers({
    player: cardPlayerReducer,
    deck: cardDeckReducer,
});

export default rootReducer;