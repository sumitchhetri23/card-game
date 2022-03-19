import ApiService from './ApiService';

class CardDeckApiService {

    static shuffleCards(deck_count = 1) {
        return new Promise((resolve, reject) => {

            return ApiService.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`)
                .then(res => {
                    if (res.data.success) {
                        return resolve(res.data);
                    } else {
                        throw res.data;
                    }
                })
                .catch(res => {
                    return res;
                });

        });
    }

}

export default CardDeckApiService;