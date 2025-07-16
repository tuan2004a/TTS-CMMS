import axios from 'axios';
import { API_URL } from '../../config/api';

export class ShiftService {
    constructor() {
        this.baseUrl = `${API_URL}/shift`;
    }

<<<<<<< HEAD
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

=======
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
>>>>>>> aa48bf97dda279eb82d45608b115ed91ba34621c

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
