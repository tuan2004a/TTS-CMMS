import axios from 'axios';
import { API_URL } from '../../config/api';

export class ShiftService {
    constructor() {}

    async getShifts({page, limit}) {
        try {
            const res = await axios.get(API_URL + '/shift/getALl', {
                params: {
                    page,
                    limit,
                },
            });
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createShift(data){
        try {
            const payload = {
            ...data,
            description: Array.isArray(data.description)
                ? data.description.join(', ') // chuyển sang chuỗi
                : data.description
            }

            const res = await axios.post(API_URL + '/shift/createShifts', payload)
            return res.data
        } catch (error) {
            console.log('❌ Lỗi gọi API:', error)
            throw error
        }
        }


    async updateShift(shiftId, shiftData){
        try {
            const res = await axios.put(API_URL + '/shift/updateShifts/' + shiftId, shiftData);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteShift(shiftId){
        try {
            const res = await axios.delete(API_URL + '/shift/deleteShifts/' + shiftId);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
