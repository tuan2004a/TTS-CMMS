import axios from 'axios';
import { API_URL } from '../config/api';

export class UserService {

    constructor() {}

    async getUsers() {
        try {
            const res = await axios.get(API_URL + '/users/getALl');
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserService;