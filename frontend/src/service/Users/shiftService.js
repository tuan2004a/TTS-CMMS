import axios from 'axios';
import { API_URL } from '../../config/api';

export class ShiftService {
    constructor() {}

    async getShifts() {
        try {
            const res = await axios.get(API_URL + '/shift/getALl');
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createShift(data){
        try {
            const res = await axios.post(API_URL + '/shift/createShifts', data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
