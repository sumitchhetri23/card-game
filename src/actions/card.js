import * as ActionTypes from '../actiontypes/card';

export const getCard = data => {
    return {
        type: ActionTypes.GET_CARD,
        data: data,
    }
};