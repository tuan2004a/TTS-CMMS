//store/slice/Users/shiftSlice.js
import { create } from 'zustand';
import { ShiftService } from '../../../service/Users/shiftService';

const shiftsSlice = create((set)=>({
    fetchShifts: async ({page, limit, keyword, searchField}) => {
        const shiftService = new ShiftService();
        const result = await shiftService.getShifts({page, limit, keyword, searchField});
        set({ shifts: result });
        return result;
    },

    createNewShift: async(shiftData) => {
        try {
            const shiftService = new ShiftService();
            const response = await shiftService.createShift(shiftData);
            return response;
        } catch (error) {
            throw new Error(`Error creating shift: ${error.message}`);
        }
    },

    updateShift: async(shiftId, data) => {
        try {
            const shiftService = new ShiftService();
            const response = await shiftService.updateShift(shiftId, data);
            return response;
        } catch (error) {
            throw new Error(`Error updating shift: ${error.message}`);
        }
    },

    deleteShift: async(shiftId) => {
        try {
            const shiftService = new ShiftService();
            const response = await shiftService.deleteShift(shiftId);
            return response;
        } catch (error) {
            throw new Error(`Error deleting shift: ${error.message}`);
        }
    },
}));

export default shiftsSlice;