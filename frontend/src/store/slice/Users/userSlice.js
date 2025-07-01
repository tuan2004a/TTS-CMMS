import { create } from 'zustand';
import { UserService } from '../../../service/Users/userService';
 
const userSlice = create((set)=>({
    users: [],
    
    fetchUsers: async () => {
        try {
            const userService = new UserService();
            const result = await userService.getUsers();
            const users = result?.docs;
            set({ users: users });
            // console.log(users);
            return users;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}))

export default userSlice;