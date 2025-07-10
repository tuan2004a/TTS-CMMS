//store/slice/Users/shiftSlice.js
import { create } from 'zustand';
import { ShiftService } from '../../../service/Users/shiftService';

const shiftsSlice = create((set)=>({
    fetchShifts: async ({page, limit}) => {
        try {
            const shiftService = new ShiftService();
            const result = await shiftService.getShifts({page, limit});
            const shifts = result;
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
    },

    updateShift: async(shiftId, data) =>{
        try {
            const shiftService = new ShiftService();
            const response = await shiftService.updateShift(shiftId, data);
            console.log(response.data);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error updating shift");
        }
    },

    deleteShift: async(shiftId) => {
        try {
            const shiftService = new ShiftService();
            const response = await shiftService.deleteShift(shiftId);
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error deleting shift");
        }
    },
}))

export default shiftsSlice;