import * as CardDeckActionTypes from '../actionTypes/cardDeck';
import * as CardPlayerActionTypes from '../actionTypes/cardPlayer';

const initialState = {
    deck_id: null,
    cards: []
};

export default function cardDeck(state = initialState, action) {

    switch (action.type) {

        case CardDeckActionTypes.NEW_GAME:

            return {
                ...state,
                cards: []
            };

        case CardPlayerActionTypes.SHOW_CARD:

                return {
                    ...state,
                    cards: [
                        ...state.cards,
                        {
                            player_id: action.player_id,
                            card: action.card,
                        }
                    ]
                };
    
        case CardDeckActionTypes.SAVE_DECK_ID:

            return {
                ...state,
                deck_id: action.deck_id
            };

        default:
            return state;

    }
}
