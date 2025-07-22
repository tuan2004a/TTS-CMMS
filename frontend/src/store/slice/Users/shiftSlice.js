import { create } from "zustand";
import { shiftService } from "../../../service/Users/shiftService";

const shiftsSlice = create((set) => ({
    shifts: [],

    // 🔁 Fetch danh sách ca làm
    fetchShifts: async ({ page, limit, keyword = "", searchField = "" }) => {
        try {
            const result = await shiftService.getShifts({ page, limit, keyword, searchField });
            set({ shifts: result });
            return result;
        } catch (error) {
            console.error("❌ Lỗi fetchShifts:", error);
            throw error;
        }
    },

    // 🆕 Tạo ca làm mới
    createNewShift: async (shiftData) => {
        try {
            const response = await shiftService.createShift(shiftData);
            console.log("✅ Tạo ca làm:", response);
            return response;
        } catch (error) {
            console.error("❌ Lỗi tạo ca làm:", error);
            throw new Error("Error creating case on file slice");
        }
    },

    // ✏️ Cập nhật ca làm
    updateShift: async (shiftId, shiftData) => {
        try {
            const payload = {
                ...shiftData,
                description: Array.isArray(shiftData.description) ? shiftData.description.join(", ") : shiftData.description,
            };
            const response = await shiftService.updateShift(shiftId, payload);
            return response;
        } catch (error) {
            console.error("❌ Lỗi updateShift:", error.response?.data || error.message);
            throw new Error("Error updating shift");
        }
    },

    // 🗑️ Xóa ca làm
    deleteShift: async (shiftId) => {
        try {
            const response = await shiftService.deleteShift(shiftId);
            console.log("🗑️ Đã xóa ca làm:", response);
            return response;
        } catch (error) {
            console.error("❌ Lỗi xóa ca làm:", error);
            throw new Error("Error deleting shift");
        }
    },
}));

export default shiftsSlice;
