import { create } from "zustand";
import { WorkService } from "../../../service/Works/workService";
import {showSuccess } from '../../../utils/toast'

export const WorkSlice = create((set) => ({
    works: [],
    loading: false,
    error: null,

    // 🔁 Fetch danh sách công việc
    fetchWorks: async ({ page, limit, keyword = "", searchField = "" }) => {
        try {
            const result = await WorkService.getAll({page,limit,keyword,searchField});
            set({ works:result  });
            // console.log(result)
            return result;
        } catch (error) {
            set({ loading: false, error: error.message || "Lỗi khi tải dữ liệu công việc" });
            console.error("❌ Lỗi fetchWorks:", error);
            throw error;
        }
    },

    createNewWork: async (workData) => {
        set({ loading: true, error: null });
        showSuccess("Tạo công việc thành công")
        try {
            const response = await WorkService.create(workData);

            set((state) => ({
                // works: [...state.works, response.data],
                loading: false
            }));
            // console.log("✅ Tạo công việc:", response);
            return response;
        } catch (error) {
            set({ loading: false, error: error.message || "Lỗi khi tạo công việc" });
            console.error("❌ Lỗi tạo công việc:", error);
            throw error;
        }
    },

    updateWork: async (id, workData) => {
        set({ loading: true, error: null });
        try {
            const response = await WorkService.update(id, workData);
            return response;
        } catch (error) {
            set({ loading: false, error: error.message || "Lỗi khi cập nhật công việc" });
            console.error("❌ Lỗi updateWork:", error.response?.data || error.message);
            throw error;
        }
    },

    deleteWork: async (workId) => {
        set({ loading: true, error: null });
        try {
            const response = await WorkService.delete(workId);
        showSuccess("Xóa công việc thành công")
            // console.log("🗑️ Đã xóa công việc:", response);
            return response;
        } catch (error) {
            set({ loading: false, error: error.message || "Lỗi khi xóa công việc" });
            console.error("❌ Lỗi xóa công việc:", error);
            throw error;
        }
    },
    
    // 🧹 Reset state
    resetWorkState: () => {
        set({
            work: null,
            error: null
        });
    }
}));

export default WorkSlice;
