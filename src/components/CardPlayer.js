import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {subscribe} from 'redux-subscriber';
import {connect} from 'react-redux';
import {getPlayer} from '../selectors/playerSelector';
import { newGame } from '../actions/deck';
import * as CardPlayerActions from '../actions/player';
import {showCard, nextTurn} from "../actions/player";

class CardPlayer extends Component {

    static propTypes = {
        player: PropTypes.object.isRequired,
    };

    componentDidMount() {
        subscribe('deck.deck_id', state => {
            this.props.getCard(state.deck.deck_id, this.props.player.id, 1);
        });

        subscribe('player.turnPlayerId', state => {

            if (state.player.turnPlayerId === this.props.player.id
                && state.player.turnPlayerId !== 1) {

                setTimeout(() => {

                    this.showCard();

                    const player = getPlayer(state.player.turnPlayerId)(state);

                    if (player.last) {

                        this.props.endOfRound();

                    } else {

                        this.props.nextTurn(this.props.player.id);
                    }

                }, 2000);
            }

        });
    }

    showCard = () => {

        const {player} = this.props;
        let length = player.hand_cards.length;

        if (length) {
            let randomIndex = Math.floor(Math.random() * length);

            let card = player.hand_cards[randomIndex];

            this.props.showCard(player.id, card);
        }

    };

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.player.hand_cards.length !== nextProps.player.hand_cards.length) ||
            (this.props.turnPlayerId !== nextProps.turnPlayerId);
    }

    render() {
        const {player, turnPlayerId} = this.props;

        const hand_cards = player.hand_cards.map((card, index) => {
            return <img src="/images/card-back.jpg" alt="Card Back" key={index}/>;
        });

        const turnCss = player.id === turnPlayerId ? 'player-turn' : '';

        return (
            <div className={`gamer-area player-${player.id} ${turnCss}`}>

                <p className="text-center player-name"><strong>{player.name}</strong></p>

                <img src="/images/user.svg" alt="User"/>

                <div className="underhanded-cards">

                    {hand_cards}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        turnPlayerId: state.player.turnPlayerId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCard: (deck_id, player_id, count) => dispatch(CardPlayerActions.getCard(deck_id, player_id, count)),
        showCard: (player_id, card) => dispatch(showCard(player_id, card)),
        nextTurn: (player_id) => dispatch(nextTurn(player_id)),
        newGame: () => dispatch(newGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPlayer);