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

    async createAccount(data) {
        try {
            const res = await axios.post(API_URL + '/users/createUsers', data);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteAccount(accountId) {
        try {
            const res = await axios.delete(API_URL + '/users/deleteUsers/' + accountId);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}