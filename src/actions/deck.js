import DeckApi from '../services/CardDeckApiService';
import * as DeckActionTypes from '../actionTypes/deck';
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