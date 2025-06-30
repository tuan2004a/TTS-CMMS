import { create } from 'zustand';
import { UserService } from '../../service/userService';
 
const userSlice = create((set)=>({
    users: [],
    
    fetchUsers: async () => {
        try {
            const userService = new UserService();
            const result = await userService.getUsers();
            set({ users: result.data });
            // console.log(result)  
            return result;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}))

export default userSlice;