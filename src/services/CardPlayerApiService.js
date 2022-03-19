import ApiService from './ApiService';

class CardPlayerApiService {

    static getCard(deck_id) {
        return new Promise((resolve, reject) => {

            return ApiService.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
                .then(response => {
                    if (response.data.success) {
                        return resolve(response.data);
                    } else {
                        throw response.data;
                    }
                })
                .catch(response => {
                    return response;
                })

        });
    }

    static addCardToPile(deck_id, name_of_pile, codes) {
        return new Promise((resolve, reject) => {

            return ApiService.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${name_of_pile}/add/?cards=${codes}`)
                .then(res => {
                    if (res.data.success) {
                        return resolve(res.data);
                    } else {
                        throw res.data;
                    }
                })
                .catch(res => {
                    return res;
                })

        });
    }

}

export default CardPlayerApiService;