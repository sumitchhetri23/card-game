import * as CardPlayerActionTypes from "../actionTypes/cardPlayer";
import CardPlayerApi from "../services/CardPlayerApiService";
import {getCommaSeparatedCodes} from '../helpers';
import {newGame} from "./deck";

import {getTotalCards} from "../selectors/playerSelector";


export const showCard = (player_id, card) => {
    return {
        type: CardPlayerActionTypes.SHOW_CARD,
        player_id: player_id,
        card: card,
    }
};

export const nextTurn = player_id => {

    return {
        type: CardPlayerActionTypes.NEXT_TURN,
        current_player_id: player_id,
    }
};

export const getCard = (deck_id, player_id, count) => {

    return function (dispatch) {

        return CardPlayerApi.getCard(deck_id, count).then(response => {

            dispatch(getCardSuccess(player_id, response.cards));

        });

    };
};

export const getCardSuccess = (player_id, cards) => {
    return {
        type: CardPlayerActionTypes.GET_CARD_SUCCESS,
        player_id: player_id,
        cards: cards,
    }
};

export const addCardToPile = (player_id, cards) => {

    return function (dispatch, getState) {

        const codes = getCommaSeparatedCodes(cards);
        let name_of_pile = `player${player_id}`;

        const deck_id = getState().deck.deck_id;

        return CardPlayerApi.addCardToPile(deck_id, name_of_pile, codes).then(response => {


            dispatch(addCardToPileSuccess(player_id, cards));

            const allCards = getTotalCards(getState());

            if (allCards === 0) {
                dispatch(findWinner());
            } else {
                setTimeout(() => {
                    dispatch(newGame());
                }, 3000);
            }
        });

    };
};

export const addCardToPileSuccess = (player_id, cards) => {
    return {
        type: CardPlayerActionTypes.ADD_CARD_TO_PILE_SUCCESS,
        player_id: player_id,
        cards: cards,
    }
};

export const findWinner = () => {
    return {
        type: CardPlayerActionTypes.FIND_WINNER,
    }
};