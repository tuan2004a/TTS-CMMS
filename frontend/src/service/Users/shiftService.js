import axios from 'axios';
import { API_URL } from '../../config/api';

export class ShiftService {
    constructor() {
        this.baseUrl = `${API_URL}/shift`;
    }

    async getShifts({ page = 1, limit = 10, keyword = "", searchField = "" } = {}) {
        try {
            const params = { page, limit };
            if (keyword) params.keyword = keyword;
            if (searchField) params.searchField = searchField;
            
            const res = await axios.get(`${this.baseUrl}/getAll`, { params });
            return res.data;
        } catch (error) {
            console.log('❌ Lỗi gọi API getShifts:', error);
            throw error;
        }
    }

    async createShift(data) {
        try {
            const payload = {
                ...data,
                description: Array.isArray(data.description)
                    ? data.description.join(', ') // chuyển sang chuỗi
                    : data.description
            }

            const res = await axios.post(`${this.baseUrl}/createShifts`, payload);
            return res.data;
        } catch (error) {
            console.log('❌ Lỗi gọi API createShift:', error);
            throw error;
        }
    }

    async updateShift(shiftId, shiftData) {
        try {
            const res = await axios.put(`${this.baseUrl}/updateShifts/${shiftId}`, shiftData);
            return res.data;
        } catch (error) {
            console.log('❌ Lỗi gọi API updateShift:', error);
            throw error;
        }
    }

    async deleteShift(shiftId) {
        try {
            const res = await axios.delete(`${this.baseUrl}/deleteShifts/${shiftId}`);
            return res.data;
        } catch (error) {
            console.log('❌ Lỗi gọi API deleteShift:', error);
            throw error;
        }
    }
}

// Create a singleton instance
export const shiftService = new ShiftService();
