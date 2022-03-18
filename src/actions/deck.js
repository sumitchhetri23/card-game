import DeckApi from '../services/DeckApiService';
import * as DeckActionTypes from '../actiontypes/deck';
import GameNotificationService from "../services/GameNotificationService";

export const shuffleCards = () => {

    return function (dispatch) {

        return DeckApi.shuffleCards().then(response => {

            dispatch(storeDeckId(response.deck_id));

        });

    };
};

export const storeDeckId = deck_id => {

    return {
        type: DeckActionTypes.STORE_DECK_ID,
        deck_id: deck_id,
    }
};

export const newRound = () => {

    GameNotificationService.info(`Start next round.`);

    return {
        type: DeckActionTypes.NEW_ROUND,
    }
};