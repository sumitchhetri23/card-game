import * as CardPlayerActionTypes from "../actiontypes/cardPlayer";
import {getPlayer, getPlayersByPileCardsTotal} from '../selectors/playerSelector';
import * as CardDeckActionTypes from "../actiontypes/cardDeck";

import {calculateMaxCardValue} from '../helpers';

const initialState = {
    players: [
        {
            id: 1,
            name: "Kobe",
            hand_cards: [],
            pile_cards: [],
            last: false
        }, {
            id: 2,
            name: "Jordan",
            hand_cards: [],
            pile_cards: [],
            last: true
        }
    ],

    turnPlayerId: 1,
    totalCards: 2,
    winners: []
};

export default function cardPlayer(state = initialState, action) {

    let players = state.players;

    switch (action.type) {

        case CardPlayerActionTypes.GET_CARD_SUCCESS:

            players = state.players.map((player, index) => {

                if (player.id === action.player_id) {
                    return {
                        ...player,
                        hand_cards: action.cards
                    }
                }

                return player;
            });

            return {
                ...state,
                players: [
                    ...players
                ]
            };


        case CardPlayerActionTypes.SHOW_CARD:

            players = state.players.map((player, index) => {

                if (player.id === action.player_id) {

                    let hand_cards = player.hand_cards.filter(card => {
                        return card.code !== action.card.code;
                    });

                    return {
                        ...player,
                        hand_cards: [...hand_cards]
                    }
                }

                return player;
            });

            return {
                ...state,
                players: [
                    ...players
                ],
                totalCards: state.totalCards - 1
            };


        case CardPlayerActionTypes.NEXT_TURN:

            let player = getPlayer(action.current_player_id)(state);

            let next_player_id = null;

            if (player.last) {
                next_player_id = 1;
            } else {
                next_player_id = action.current_player_id + 1;
            }

            return {
                ...state,
                turnPlayerId: next_player_id
            };


        case CardPlayerActionTypes.ADD_CARD_TO_PILE_SUCCESS:

            players = state.players.map((player, index) => {

                if (player.id === action.player_id) {
                    return {
                        ...player,
                        pile_cards: [
                            ...player.pile_cards,
                            ...action.cards
                        ]
                    }
                }

                return player;
            });

            return {
                ...state,
                players: [
                    ...players
                ]
            };


        case CardDeckActionTypes.NEW_GAME:

            return {
                ...state,
                turnPlayerId: 1
            };

        case CardPlayerActionTypes.FIND_WINNER:

            const maxValue = calculateMaxCardValue(state.players);

            let winners = getPlayersByPileCardsTotal(maxValue)(state);


            return {
                ...state,
                winners: winners
            };


        default:
            return state;

    }
}
