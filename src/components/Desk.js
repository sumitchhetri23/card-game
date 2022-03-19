import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPlayers} from '../selectors/playerSelector';
import {getDeckCards} from '../selectors/deckSelector';
import Player from "./CardPlayer";
import DeckCard from "./DeckCard";
import {newGame} from "../actions/deck";
import {addCardToPile} from "../actions/player";
import {calculateRoundWinner} from '../helpers';

class Desk extends Component {

    onEndOfRound = () => {

        let winnerCard = calculateRoundWinner(this.props.deck_cards);

        this.props.addCardToPile(winnerCard.player_id, this.props.deck_cards);
    };

    render() {

        const {players, deck_cards} = this.props;


        const playerComponents = players.map((player, index) => {
            return <Player key={player.id}
                           player={player}
                           endOfRound={this.onEndOfRound}/>;
        });

        const cardComponents = deck_cards.map((cardInfo, index) => {
            return <DeckCard cardInfo={cardInfo} key={index}/>;
        });

        return (
            <div className="desk">


                <div className="rounded-circle game">


                    {playerComponents}


                    <div className="inner-game">

                        {cardComponents}

                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        players: getPlayers(state),
        deck_cards: getDeckCards(state),


    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        newGame: () => dispatch(newGame()),
        addCardToPile: (pile_name, cards) => dispatch(addCardToPile(pile_name, cards))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Desk);