import { create } from 'zustand';
import { AccountService } from '../../../service/Users/accountService';

const accountSlice = create((set) => ({
    fetchAccounts: async ({page, limit}) => {
        try {
            const accountService = new AccountService();
            const result = await accountService.getAccounts({page, limit});
            const accounts = result;
            set({ accounts: accounts });
            // console.log(accounts);

            return accounts;
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    createNewAccount: async (accountData) => {
        try {
            const accountService = new AccountService();
            const response = await accountService.createAccount(accountData);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error creating account");
        }
    },

    deleteAccount: async (accountId) => {
        try {
            const accountService = new AccountService();
            const response = await accountService.deleteAccount(accountId);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error deleting account");
        }
    }
}))
export default accountSlice;