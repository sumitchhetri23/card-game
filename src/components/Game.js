import React, {Component} from 'react';
import Restart from "./Restart";
import Deck from "./Deck";
import {connect} from 'react-redux';
import Card from './Card';
import {showCard} from '../actions/player';
import {updateTurn} from '../actions/player';

import {getPlayerHandCards, isPlayerTurn} from '../selectors/playerSelector';
import {subscribe} from "redux-subscriber";
import GameNotificationService from "../services/GameNotificationService";
import {valueOfCard} from '../helperFunctions';
class Game extends Component {

    componentDidMount() {
        subscribe('player.winners', state => {

            const cardsCheck = state.deck.cards;
            if(valueOfCard(cardsCheck[0].card.value) == valueOfCard(cardsCheck[1].card.value)){
                GameNotificationService.error("The game is tied.","Try Again",10000);
            }else{
                const winners = state.player.winners;
                if (winners.length === 1) {

                if (winners[0].id === 1) {
                    GameNotificationService.success("You are the winner of this game.", "Congratulations!", 100000);
                } else {
                    GameNotificationService.error("Winner of the game is: " + winners[0].name, "Good Luck for Next Time", 100000, false);
                }
            }
        }        
        });
    }

    onShowCard = (card) => {
        this.props.showCard(1, card);
        this.props.updateTurn(1);
    };

    render() {
        const cards=this.props.my_cards;
        const cardComponents = cards.map((card, index) => {
            return <Card card={card} isTurn={this.props.isTurn}
                         onShowCard={this.onShowCard}
                         key={index}/>;
        });
        return (
            <div className="game">

                <Deck/>

                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-12">

                            {cardComponents}
                            <Restart />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isTurn: isPlayerTurn(1)(state),
        my_cards: getPlayerHandCards(1)(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showCard: (player_id, card) => dispatch(showCard(player_id, card)),
        updateTurn: (player_id) => dispatch(updateTurn(player_id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
