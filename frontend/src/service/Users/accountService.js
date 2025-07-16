import axios from 'axios';
import { API_URL } from '../../config/api';
import { showSuccess, showError } from '../../utils/toast';

export class AccountService {
    constructor() {}

    async getAccounts({page, limit}) {
        try {
            const res = await axios.get(API_URL + '/users/getAll', {
                params: {
                    page,
                    limit,
                },
            });
            return res.data;
        } catch (error) {
            showError('Lỗi khi lấy danh sách người dùng');
            throw error;
        }
    }

    async createAccount(data) {
        try {
            const res = await axios.post(API_URL + '/users/createUsers', data);
            showSuccess('Thêm người dùng thành công');
            return res.data;
        } catch (error) {
            showError('Thêm người dùng thất bại');
            throw error;
        }
    }

    async updateAccount(accountId, data) {
        try {
            const res = await axios.put(API_URL + '/users/updateUsers/' + accountId, data);
            showSuccess('Cập nhật người dùng thành công');
            return res.data;
        } catch (error) {
            showError('Cập nhật người dùng thất bại');
            throw error;
        }
    }

    async deleteAccount(accountId) {
        try {
            const res = await axios.delete(API_URL + '/users/deleteUsers/' + accountId);
            showSuccess('Xóa người dùng thành công');
            return res.data;
        } catch (error) {
            showError('Xóa người dùng thất bại');
            throw error;
        }
    }
}