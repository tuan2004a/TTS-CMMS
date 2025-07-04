//store/slice/Users/shiftSlice.js
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

    createNewShift: async(shiftData) => {
        try {
            const shiftService = new ShiftService();
            const response = await shiftService.createShift(shiftData);

            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error creating case on file slice");
        }
    }
}))

export default shiftsSlice;