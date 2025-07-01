import { create } from 'zustand';
import { ShiftService } from '../../../service/Users/shiftService';

const shiftsSlice = create((set)=>({
    fetchShifts: async () => {
        try {
            const shiftService = new ShiftService();
            const result = await shiftService.getShifts();
            const shifts = result?.docs;
            set({ shifts: shifts });
            // console.log(shifts);
            return shifts;
        } catch (error) {
            console.log(error);
            throw error
        }
    },
}))

export default shiftsSlice;