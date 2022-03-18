import * as ActionTypes from '../actionTypes/card';

export const getCard = data => {
    return {
        type: ActionTypes.GET_CARD,
        data: data,
    }
};