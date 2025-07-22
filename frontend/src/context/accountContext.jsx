import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import accountSlice from "../store/slice/Users/accountSlice";
import { showError } from "../utils/toast";

/**
 * Context quản lý trạng thái và hành động liên quan đến tài khoản người dùng
 */
export const AccountContext = createContext(null);

const initialState = {
    accounts: [],
    pagination: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    limit: 10,
    keyword: '',
}

/**
 * Provider cung cấp các hàm và trạng thái quản lý tài khoản
 * @param {Object} props - Props
 * @param {React.ReactNode} props.children - Component con
 */
export const AccountProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    
    /**
     * Tải danh sách tài khoản với phân trang và tìm kiếm
     * @param {Object} options - Tùy chọn tải
     * @param {number} options.p - Số trang
     * @param {number} options.l - Số lượng bản ghi mỗi trang
     * @param {string} options.keyword - Từ khóa tìm kiếm
     */
    const loadAccount = useCallback(async ({ 
        p = state.currentPage, 
        l = state.limit, 
        keyword = state.keyword 
    } = {}) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await accountSlice.getState().fetchAccounts({ 
                page: p, 
                limit: l,
                keyword
            });
            const { hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter,
                prevPage, totalDocs, totalPages
            } = response;
            setState(prev => ({
                ...prev,
                accounts: response,
                currentPage: page,
                keyword: keyword,
                pagination: {
                    hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter,
                    prevPage, totalDocs, totalPages
                },
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                accounts: [],
                isLoading: false,
                error,
            }));
        }
    }, []);

    // Tải dữ liệu lần đầu khi component được mount
    useEffect(() => {
        loadAccount();
    }, [loadAccount]);

    /**
     * Tạo tài khoản mới
     * @param {Object} formData - Dữ liệu tài khoản mới
     */
    const createAccount = useCallback(async (formData) => {
        try {
            const response = await accountSlice.getState().createNewAccount(formData);
            await loadAccount();
            return response;
        } catch (error) {
            showError('Thêm người dùng thất bại');
            throw error;
        }
    }, [loadAccount]);

    /**
     * Cập nhật thông tin tài khoản
     * @param {string} accountId - ID tài khoản cần cập nhật
     * @param {Object} formData - Dữ liệu cập nhật
     */
    const updateAccount = useCallback(async (accountId, formData) => {
        try {
            const response = await accountSlice.getState().updateAccount(accountId, formData);
            await loadAccount();
            return response;
        } catch (error) {
            throw error;
        }
    }, [loadAccount]);

    /**
     * Xóa tài khoản
     * @param {string} accountId - ID tài khoản cần xóa
     */
    const deleteAccount = useCallback(async (accountId) => {
        try {
            const response = await accountSlice.getState().deleteAccount(accountId);
            await loadAccount();
            return response;
        } catch (error) {
            showError('Xóa người dùng thất bại');
            throw error;
        }
    }, [loadAccount]);

    /**
     * Tìm kiếm tài khoản
     * @param {string} keyword - Từ khóa tìm kiếm
     */
    const searchAccounts = useCallback((keyword) => {
        loadAccount({ keyword, p: 1 }); // Reset về trang 1 khi tìm kiếm
    }, [loadAccount]);
    
    const contextValue = useMemo(() => ({
        ...state,
        loadAccount,
        deleteAccount,
        createAccount,
        updateAccount,
        searchAccounts
    }), [
        state, 
        loadAccount, 
        deleteAccount, 
        createAccount, 
        updateAccount, 
        searchAccounts
    ]);

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    );
};

AccountProvider.propTypes = {
    children: PropTypes.node.isRequired
};

/**
 * Hook sử dụng AccountContext
 * @returns {Object} Context giá trị và hàm quản lý tài khoản
 */
export const useAccountContext = () => {
    const context = useContext(AccountContext);
    if(!context) throw new Error('useAccountContext must be used within a AccountProvider');
    return context;
}