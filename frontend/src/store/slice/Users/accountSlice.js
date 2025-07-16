import { create } from 'zustand';
import { AccountService } from '../../../service/Users/accountService';
import { showError } from '../../../utils/toast';

const accountSlice = create((set) => ({
    fetchAccounts: async ({page, limit}) => {
        const accountService = new AccountService();
        const result = await accountService.getAccounts({page, limit});
        set({ accounts: result });
        return result;
    },

    createNewAccount: async (accountData) => {
        try {
            const accountService = new AccountService();
            return await accountService.createAccount(accountData);
        } catch (error) {
            showError('Thêm người dùng thất bại');
            throw error;
        }
    },

    updateAccount: async (accountId, accountData) => {
        try {
            const accountService = new AccountService();
            return await accountService.updateAccount(accountId, accountData);
        } catch (error) {
            showError('Cập nhật người dùng thất bại');
            throw error;
        }
    },

    deleteAccount: async (accountId) => {
        try {
            const accountService = new AccountService();
            return await accountService.deleteAccount(accountId);
        } catch (error) {
            showError('Xóa người dùng thất bại');
            throw error;
        }
    }
}));

export default accountSlice;