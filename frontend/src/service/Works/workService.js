import axios from "axios";
import { API_URL } from "../../config/api";


export const WorkService = {

    getAll: async ({ page = 1, limit = 10, keyword = "", searchField = "" } = {}) => {
        try {

            const params = { page, limit };
            if (keyword) params.keyword = keyword;
            if (searchField) params.searchField = searchField;

            const response = await axios.get(`${API_URL}/work/getAll`, { params });
            
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    create: async (workData) => {
        try {
            const response = await axios.post(`${API_URL}/work/create`, workData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    update: async (id, workData) => {
        try {
            const response = await axios.put(`${API_URL}/work/update/${id}`, workData);
            return response.data;
        } catch (error) {
            console.log(error)
            throw error.response?.data || error.message;
        }
    },

    delete: async (workId) => {
        try {
            const response = await axios.delete(`${API_URL}/work/delete/${workId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

