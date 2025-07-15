import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import roleSlice from "../store/slice/Users/roleSlice";

export const RoleContext = createContext(null);

const initialState = {
    roles: [],
    pagination: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    limit: 10
};

export const RoleProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    const fetchRolesRef = useRef(null);

    // 🔄 Load danh sách vai trò từ API
    const LoadRoles = useCallback(async ({ p = state.currentPage, l = state.limit } = {}) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await roleSlice.getState().fetchRoles({ page: p, limit: l });

            // Dữ liệu phân trang từ backend
            const {
                docs,
                totalDocs,
                limit: pageLimit,
                page: currentPage
            } = response;

            setState(prev => ({
                ...prev,
                roles: docs || [],
                pagination: {
                    totalDocs,
                    limit: pageLimit,
                    currentPage
                },
                currentPage: currentPage,
                limit: pageLimit,
                isLoading: false,
                error: null
            }));

            return response;
        } catch (error) {
            console.error("❌ Error loading roles:", error);
            setState(prev => ({
                ...prev,
                roles: [],
                isLoading: false,
                error: error
            }));
            throw error;
        }
    }, [state.currentPage, state.limit]);

    // 👉 Chuyển trang
    const setPage = useCallback(async (newPage) => {
        setState(prev => ({ ...prev, currentPage: newPage }));
        await LoadRoles({ p: newPage, l: state.limit });
    }, [LoadRoles, state.limit]);

    // ⏳ Khởi động tải dữ liệu ban đầu
    useEffect(() => {
        fetchRolesRef.current = LoadRoles;
        if (fetchRolesRef.current) {
            fetchRolesRef.current();
        }
    }, [LoadRoles]);

    // ✅ Tạo vai trò mới
    const createRole = useCallback(async (formData) => {
        try {
            const response = await roleSlice.getState().createNewRole(formData);
            await LoadRoles();
            return response;
        } catch (error) {
            console.error("❌ Error creating role:", error);
            throw error;
        }
    }, [LoadRoles]);

    // ✏️ Cập nhật vai trò
    const updateRole = useCallback(async (roleId, formData) => {
        try {
            const response = await roleSlice.getState().updateRole(roleId, formData);
            await LoadRoles();
            return response;
        } catch (error) {
            console.error("❌ Error updating role:", error);
            throw error;
        }
    }, [LoadRoles]);

    // 🗑️ Xóa vai trò
    const deleteRole = useCallback(async (roleId) => {
        try {
            const response = await roleSlice.getState().deleteRole(roleId);
            await LoadRoles();
            return response;
        } catch (error) {
            console.error("❌ Error deleting role:", error);
            throw error;
        }
    }, [LoadRoles]);

    // 🔗 Giá trị trả ra context
    const contextValue = useMemo(() => ({
        ...state,
        LoadRoles,
        setPage,
        createRole,
        updateRole,
        deleteRole
    }), [state, LoadRoles, setPage, createRole, updateRole, deleteRole]);

    return (
        <RoleContext.Provider value={contextValue}>
            {children}
        </RoleContext.Provider>
    );
};

// 📦 Hook gọi nhanh context
export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) throw new Error("useRoleContext must be used within a RoleProvider");
    return context;
};
