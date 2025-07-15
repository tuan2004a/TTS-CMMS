import axios from 'axios';
import { API_URL } from '../../config/api';

export class ShiftService {
    constructor() {
        this.baseUrl = `${API_URL}/shift`;
    }

    async getShifts({page, limit, keyword, searchField}) {
        const res = await axios.get(`${this.baseUrl}/getALl`, {
            params: {
                page,
                limit,
                keyword,
                searchField
            },
        });
        return res.data;
    }

    async createShift(data) {
        const res = await axios.post(`${this.baseUrl}/createShifts`, data);
        return res.data;
    }

    async updateShift(shiftId, shiftData) {
        const res = await axios.put(`${this.baseUrl}/updateShifts/${shiftId}`, shiftData);
        return res.data;
    }

    async deleteShift(shiftId) {
        const res = await axios.delete(`${this.baseUrl}/deleteShifts/${shiftId}`);
        return res.data;
    }
}
