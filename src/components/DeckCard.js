import React, {Component} from 'react';
import PropTypes from "prop-types";

class DeckCard extends Component {

    static propTypes = {
        cardInfo: PropTypes.object.isRequired,
    };

    render() {
        const {cardInfo} = this.props;

        return (<div className="all-card"><img src={cardInfo.card.image} alt="Card"/></div>);
    }
}

export default DeckCard;