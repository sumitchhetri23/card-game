import React, {Component} from 'react';
import Restart from "./Restart";
import Desk from "./Desk";
import {connect} from 'react-redux';
import Card from './Card';
import {showCard} from '../actions/player';
import {nextTurn} from '../actions/player';

import {getPlayerCard, checkPlayerTurn} from '../selectors/playerSelector';
import {subscribe} from "redux-subscriber";
import GameNotificationService from "../services/GameNotificationService";
import {valueOfCard} from '../helpers';

class Lobby extends Component {

    componentDidMount() {
        subscribe('player.winners', state => {

            const cardsCheck = state.deck.cards;
            if(valueOfCard(cardsCheck[0].card.value) == valueOfCard(cardsCheck[1].card.value)){
                GameNotificationService.info("The game is tied.","Try Again",10000);
            }else{
                const winners = state.player.winners;
                if (winners.length === 1) {

                if (winners[0].id === 1) {
                    GameNotificationService.success("You are the winner of this game.", "Congratulations!", 10000);
                } else {
                    GameNotificationService.error("Winner of the game is: " + winners[0].name, "Good Luck for Next Time", 10000);
                }
            }
        }        
        });
    }

    onShowCard = (card) => {
        this.props.showCard(1, card);
        this.props.nextTurn(1);
    };

    render() {
        const cards=this.props.my_cards;
        const cardComponents = cards.map((card, index) => {
            return <Card card={card} isTurn={this.props.isTurn}
                         onShowCard={this.onShowCard}
                         key={index}/>;
        });
        return (
            
            <div className="lobby">

                <Desk/>

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
        isTurn: checkPlayerTurn(1)(state),
        my_cards: getPlayerCard(1)(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showCard: (player_id, card) => dispatch(showCard(player_id, card)),
        nextTurn: (player_id) => dispatch(nextTurn(player_id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
