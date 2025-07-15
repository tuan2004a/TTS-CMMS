import { create } from 'zustand';
import { RoleService } from '../../../service/Users/roleService';

const roleSlice = create((set, get) => ({
    // Trạng thái toàn cục
    roles: [],
    pagination: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    limit: 10,

    // ⏳ Load danh sách vai trò từ MongoDB
    fetchRoles: async ({ page = get().currentPage, limit = get().limit } = {}) => {
        set({ isLoading: true });
        try {
            const service = new RoleService();
            const result = await service.getRoles({ page, limit });

            const { docs, totalDocs, limit: resLimit, page: resPage } = result;

            set({
                roles: docs || [],
                pagination: {
                    totalDocs,
                    limit: resLimit,
                    currentPage: resPage
                },
                currentPage: resPage,
                limit: resLimit,
                isLoading: false,
                error: null
            });

            return result;
        } catch (error) {
            console.error("❌ Lỗi load vai trò:", error);
            set({ roles: [], pagination: {}, isLoading: false, error });
            throw error;
        }
    },

    // 🎯 Chuyển trang
    setPage: async (newPage) => {
        set({ currentPage: newPage });
        await get().fetchRoles({ page: newPage });
    },

    // ✅ Tạo mới vai trò
    createNewRole: async (formData) => {
        try {
            const service = new RoleService();
            const response = await service.createRole(formData);
            console.log("✅ Tạo vai trò:", response);
            await get().fetchRoles(); // cập nhật lại danh sách
            return response;
        } catch (error) {
            console.error("❌ Lỗi tạo vai trò:", error);
            throw error;
        }
    },

    // ✏️ Cập nhật vai trò
    updateRole: async (roleId, formData) => {
        try {
            const service = new RoleService();
            const response = await service.updateRole(roleId, formData);
            console.log("✅ Cập nhật vai trò:", response);
            await get().fetchRoles();
            return response;
        } catch (error) {
            console.error("❌ Lỗi cập nhật vai trò:", error);
            throw error;
        }
    },

    // 🗑️ Xóa vai trò
    deleteRole: async (roleId) => {
        try {
            const service = new RoleService();
            const response = await service.deleteRole(roleId);
            console.log("🗑️ Xóa vai trò:", response);
            await get().fetchRoles();
            return response;
        } catch (error) {
            console.error("❌ Lỗi xóa vai trò:", error);
            throw error;
        }
    }
}));

export default roleSlice;
