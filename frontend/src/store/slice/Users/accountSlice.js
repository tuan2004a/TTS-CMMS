import { create } from 'zustand';
import { AccountService } from '../../../service/Users/accountService';
import { showError } from '../../../utils/toast';

// Tạo một instance duy nhất của AccountService
const accountService = new AccountService();

/**
 * Zustand store quản lý state cho tài khoản người dùng
 */
const accountSlice = create((set) => ({
    accounts: null,
    
    /**
     * Lấy danh sách tài khoản với phân trang và tìm kiếm
     * @param {Object} params - Tham số request
     * @param {number} params.page - Số trang
     * @param {number} params.limit - Số lượng bản ghi mỗi trang
     * @param {string} params.keyword - Từ khóa tìm kiếm
     * @returns {Promise<Object>} Dữ liệu tài khoản đã được phân trang
     */
    fetchAccounts: async ({page, limit, keyword = ''}) => {
        try {
            const result = await accountService.getAccounts({page, limit, keyword});
            set({ accounts: result });
            return result;
        } catch (error) {
            set({ accounts: null });
            throw error;
        }
    },

    /**
     * Tạo tài khoản mới
     * @param {Object} accountData - Dữ liệu tài khoản
     * @returns {Promise<Object>} Kết quả tạo tài khoản
     */
    createNewAccount: async (accountData) => {
        try {
            return await accountService.createAccount(accountData);
        } catch (error) {
            showError('Thêm người dùng thất bại');
            throw error;
        }
    },

    /**
     * Cập nhật thông tin tài khoản
     * @param {string} accountId - ID tài khoản cần cập nhật
     * @param {Object} accountData - Dữ liệu cập nhật
     * @returns {Promise<Object>} Kết quả cập nhật
     */
    updateAccount: async (accountId, accountData) => {
        try {
            return await accountService.updateAccount(accountId, accountData);
        } catch (error) {
            showError('Cập nhật người dùng thất bại');
            throw error;
        }
    },

    /**
     * Xóa tài khoản
     * @param {string} accountId - ID tài khoản cần xóa
     * @returns {Promise<Object>} Kết quả xóa
     */
    deleteAccount: async (accountId) => {
        try {
            return await accountService.deleteAccount(accountId);
        } catch (error) {
            showError('Xóa người dùng thất bại');
            throw error;
        }
    }
}));

export default accountSlice;