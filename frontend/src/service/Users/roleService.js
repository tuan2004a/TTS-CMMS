import axios from 'axios';
import { API_URL } from '../../config/api';

export class RoleService {
    constructor() {}

    async getRoles({ page, limit }) {
        try {
            const res = await axios.get(`${API_URL}/role/getAll`, {
                params: { page, limit }
            });

            const data = res.data;

            if (data?.result !== true) {
                throw new Error(data?.msg || "Lấy danh sách vai trò thất bại từ server");
            }

            return data;
        } catch (error) {
            console.error("❌ Lỗi khi lấy vai trò:", error.response?.data || error.message);
            throw error;
        }
    }

    async createRole(data) {
        try {
            const res = await axios.post(`${API_URL}/role/createRole`, data);
            const response = res.data;

            if (response?.result !== true) {
                throw new Error(response?.msg || "Tạo vai trò thất bại từ server");
            }

            return response;
        } catch (error) {
            console.error("❌ Lỗi khi tạo vai trò:", error.response?.data || error.message);
            throw error;
        }
    }

    async updateRole(roleId, roleData) {
        try {
            const res = await axios.put(`${API_URL}/role/updateRole/${roleId}`, roleData);
            const response = res.data;

            if (response?.result !== true) {
                throw new Error(response?.msg || "Cập nhật vai trò thất bại từ server");
            }

            return response;
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật vai trò:", error.response?.data || error.message);
            throw error;
        }
    }

    async deleteRole(roleId) {
        try {
            const res = await axios.delete(`${API_URL}/role/deleteRole/${roleId}`);
            const response = res.data;

            if (response?.result !== true) {
                throw new Error(response?.msg || "Xóa vai trò thất bại từ server");
            }

            return response;
        } catch (error) {
            console.error("❌ Lỗi khi xóa vai trò:", error.response?.data || error.message);
            throw error;
        }
    }
}
