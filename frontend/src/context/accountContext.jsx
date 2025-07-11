import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import accountSlice from "../store/slice/Users/accountSlice";

export const AccountContext = createContext(null);

const initialState = {
    accounts: [],
    pagination: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    limit: 10,
}

export const AccountProvider = ({children}) => {
    const [state, setState] = useState(initialState);
    const fetchShiftsRef = useRef(null);

    const LoadAccount = useCallback(async({ p = state.currentPage, l = state.limit } = {}) =>{
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await accountSlice.getState().fetchAccounts({ page: p, limit: l });
            const { hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter,
                prevPage, totalDocs, totalPages
            } = response;
            setState(prev => ({
                ...prev,
                accounts: response,
                pagination: {
                    hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter,
                    prevPage, totalDocs, totalPages
                },
                isLoading: false,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                shifts: [],
                isLoading: false,
                error,
            }));
        }
    },[state.currentPage, state.limit]);

    useEffect(() => {
        fetchShiftsRef.current = LoadAccount;
        if (fetchShiftsRef.current) {
            fetchShiftsRef.current();
        }
    }, [LoadAccount]);
    
    const contextValue = useMemo(()=>({
        ...state,
        LoadAccount
    }),[state, LoadAccount])

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    )
}

export const useAccountContext = () =>{
    const context = useContext(AccountContext);
    if(!context) throw new Error('useAccountContext must be used within a AccountProvider');
    return context;
}