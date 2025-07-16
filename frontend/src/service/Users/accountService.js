import axios from 'axios';
import { API_URL } from '../../config/api';
import { showSuccess, showError } from '../../utils/toast';

/**
 * Service quản lý các API liên quan đến tài khoản người dùng
 */
export class AccountService {
    /**
     * Lấy danh sách người dùng với phân trang và tìm kiếm
     * @param {Object} params - Tham số request
     * @param {number} params.page - Số trang
     * @param {number} params.limit - Số lượng bản ghi mỗi trang
     * @param {string} params.keyword - Từ khóa tìm kiếm (tên, email, SĐT)
     * @returns {Promise<Object>} Dữ liệu người dùng đã được phân trang
     */
    async getAccounts({page, limit, keyword = ''}) {
        try {
            const res = await axios.get(`${API_URL}/users/getAll`, {
                params: {
                    page,
                    limit,
                    keyword
                },
            });
            return res.data;
        } catch (error) {
            showError('Lỗi khi lấy danh sách người dùng');
            throw error;
        }
    }

    /**
     * Tạo người dùng mới
     * @param {Object} data - Dữ liệu người dùng
     * @returns {Promise<Object>} Thông tin người dùng đã tạo
     */
    async createAccount(data) {
        try {
            const res = await axios.post(`${API_URL}/users/createUsers`, data);
            showSuccess('Thêm người dùng thành công');
            return res.data;
        } catch (error) {
            showError('Thêm người dùng thất bại');
            throw error;
        }
    }

    /**
     * Cập nhật thông tin người dùng
     * @param {string} accountId - ID người dùng cần cập nhật
     * @param {Object} data - Dữ liệu cập nhật
     * @returns {Promise<Object>} Thông tin người dùng sau khi cập nhật
     */
    async updateAccount(accountId, data) {
        try {
            const res = await axios.put(`${API_URL}/users/updateUsers/${accountId}`, data);
            showSuccess('Cập nhật người dùng thành công');
            return res.data;
        } catch (error) {
            showError('Cập nhật người dùng thất bại');
            throw error;
        }
    }

    /**
     * Xóa người dùng
     * @param {string} accountId - ID người dùng cần xóa
     * @returns {Promise<Object>} Kết quả xóa
     */
    async deleteAccount(accountId) {
        try {
            const res = await axios.delete(`${API_URL}/users/deleteUsers/${accountId}`);
            showSuccess('Xóa người dùng thành công');
            return res.data;
        } catch (error) {
            showError('Xóa người dùng thất bại');
            throw error;
        }
    }
}