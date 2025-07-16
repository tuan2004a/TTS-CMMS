import { create } from 'zustand'
import { ShiftService } from '../../../service/Users/shiftService'

<<<<<<< HEAD
const shiftsSlice = create((set) => ({
  shifts: [],

  // 🔁 Fetch danh sách ca làm
  fetchShifts: async ({ page, limit }) => {
    try {
      const shiftService = new ShiftService()
      const result = await shiftService.getShifts({ page, limit })
      set({ shifts: result })
      return result
    } catch (error) {
      console.error('❌ Lỗi fetchShifts:', error)
      throw error
    }
  },

  // 🆕 Tạo ca làm mới
  createNewShift: async (shiftData) => {
    try {
      const shiftService = new ShiftService()
      const response = await shiftService.createShift(shiftData)
      console.log('✅ Tạo ca làm:', response)
      return response
    } catch (error) {
      console.error('❌ Lỗi tạo ca làm:', error)
      throw new Error('Error creating case on file slice')
    }
  },

  // ✏️ Cập nhật ca làm
  async updateShift(shiftId, shiftData) {
    try {
        const shiftService = new ShiftService()
        const payload = {
        ...shiftData,
        description: Array.isArray(shiftData.description)
            ? shiftData.description.join(', ')
            : shiftData.description
        }
        const response = await shiftService.updateShift(shiftId, payload)
        return response
    } catch (error) {
        console.error('❌ Lỗi updateShift:', error.response?.data || error.message)
        throw new Error('Error updating shift')
    }
    },

  // 🗑️ Xóa ca làm
  deleteShift: async (shiftId) => {
    try {
      const shiftService = new ShiftService()
      const response = await shiftService.deleteShift(shiftId)
      console.log('🗑️ Đã xóa ca làm:', response)
      return response
    } catch (error) {
      console.error('❌ Lỗi xóa ca làm:', error)
      throw new Error('Error deleting shift')
    }
  }
}))
=======
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
>>>>>>> aa48bf97dda279eb82d45608b115ed91ba34621c

export default shiftsSlice
