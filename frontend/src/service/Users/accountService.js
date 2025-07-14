import axios from 'axios';
import { API_URL } from '../../config/api';

export class AccountService {
    constructor() {}
    async getAccounts({page, limit}) {
        try {
            const res = await axios.get(API_URL + '/users/getALl', {
                params: {
                    page,
                    limit,
                },
            });
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}