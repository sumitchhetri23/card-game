import React, {Component} from 'react';
import PropTypes from "prop-types";

class Card extends Component {

    static propTypes = {
        card: PropTypes.object.isRequired,
        isTurn: PropTypes.bool.isRequired,
        onShowCard: PropTypes.func.isRequired,
    };

    showCard = () => {
        this.props.onShowCard(this.props.card);
    };

    render() {

        const {card, isTurn} = this.props;

        let showCardOption = null;
        if (isTurn) {
            showCardOption = <div className="hover-button">

                <div className="p-5">
                    <i className="fa fa-2x fa-arrow-circle-up" aria-hidden="true"
                       onClick={this.showCard}></i>
                </div>

            </div>
        }

        return (
            <div className="one-card">

                {showCardOption}
                <div className="text-center">
                <img src={card.image} alt="card image"/>
                </div>
            </div>
        );
    }
}

export default Card;