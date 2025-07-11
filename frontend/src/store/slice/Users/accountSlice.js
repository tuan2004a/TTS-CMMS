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
}))
export default accountSlice;