import { create } from 'zustand';
import { AccountService } from '../../../service/Users/accountService';
import { showError } from '../../../utils/toast';

const accountSlice = create((set) => ({
    fetchAccounts: async ({page, limit}) => {
        try {
            const accountService = new AccountService();
            const result = await accountService.getAccounts({page, limit});
            const accounts = result;
            set({ accounts: accounts });
            return accounts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    createNewAccount: async (accountData) => {
        try {
            const accountService = new AccountService();
            const response = await accountService.createAccount(accountData);
            return response;
        } catch (error) {
            console.log(error);
            showError('Thêm người dùng thất bại create ở slice');
            throw error; // Chuyển tiếp lỗi từ accountService
        }
    },

    deleteAccount: async (accountId) => {
        try {
            const accountService = new AccountService();
            const response = await accountService.deleteAccount(accountId);
            return response;
        } catch (error) {
            console.log(error);
            throw error; // Chuyển tiếp lỗi từ accountService
        }
    }
}))
export default accountSlice;