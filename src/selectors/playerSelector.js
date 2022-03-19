import {createSelector} from 'reselect';


const players = (state) => state.player ? state.player.players : state.players;
const turnPlayerId = (state) => state.player ? state.player.turnPlayerId : state.turnPlayerId;
const totalCards = (state) => state.player ? state.player.totalCards : state.totalCards;


export const getPlayers = createSelector(
    [players],
    (players) => players
);

export const getPlayer = (id) => createSelector(
    [players],
    (players) => {
        return players.find((player) => player.id === id);
    }
);

export const getPlayerCard = (player_id) => createSelector(
    [players],
    (players) => {
        const player = players.find((player) => player.id === player_id);
        return player.hand_cards;
    }
);

export const checkPlayerTurn = (player_id) => createSelector(
    [players, turnPlayerId],
    (players, turnPlayerId) => {
        const player = players.find((player) => player.id === player_id);
        return player.id === turnPlayerId;
    }
);

export const getTotalCards = createSelector(
    [totalCards],
    (totalCards) => totalCards
);

export const getPlayersByPileCardsTotal = (total) => createSelector(
    [players],
    (players) => {

        players = players.filter((player) => {
            return player.pile_cards.length === total;
        });

        return players;
    }
);