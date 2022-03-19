import CardDeckApi from '../services/CardDeckApiService';
import * as CardDeckActionTypes from '../actionTypes/cardDeck';
import GameNotificationService from "../services/GameNotificationService";

export const saveDeckId = deck_id => {

    return {
        type: CardDeckActionTypes.SAVE_DECK_ID,
        deck_id: deck_id,
    }
};

export const newGame = () => {

    GameNotificationService.info(`Start next round.`);

    return {
        type: CardDeckActionTypes.NEW_GAME,
    }
};
export const shuffleCards = () => {

    return function (dispatch) {

        return CardDeckApi.shuffleCards().then(response => {

            dispatch(saveDeckId(response.deck_id));

        });

    };
};

