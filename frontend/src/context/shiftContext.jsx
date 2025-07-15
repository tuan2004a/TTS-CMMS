// context/shiftContext.jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import shiftSlice from "../store/slice/Users/shiftSlice";

export const ShiftContext = createContext(null);

const initialState = {
    shifts: [],
    pagination: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    limit: 10,
};

export const ShiftProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    const loadShiftsRef = useRef(null);

    /**
     * Load shifts data with filtering and pagination
     */
    const loadShifts = useCallback(async ({ 
        page = state.currentPage, 
        limit = state.limit, 
        keyword = "", 
        searchField = "" 
    } = {}) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await shiftSlice.getState().fetchShifts({ 
                page, 
                limit, 
                keyword, 
                searchField 
            });
            
            const {
                hasNextPage, 
                hasPrevPage, 
                limit: respLimit, 
                nextPage, 
                pagingCounter,
                prevPage, 
                result, 
                totalDocs, 
                totalPages
            } = response;

            setState(prev => ({
                ...prev,
                shifts: response,
                pagination: {
                    hasNextPage, 
                    hasPrevPage, 
                    limit: respLimit, 
                    nextPage, 
                    page,
                    pagingCounter, 
                    prevPage, 
                    result, 
                    totalDocs, 
                    totalPages
                },
                currentPage: page,
                limit: respLimit,
                isLoading: false,
                error: null,
            }));

            return response;
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message || "Failed to load shifts",
            }));
            throw error;
        }
    }, [state.currentPage, state.limit]);

    /**
     * Update current page and load data for that page
     */
    const setPage = useCallback(async (newPage) => {
        setState(prev => ({ ...prev, currentPage: newPage }));
        await loadShifts({ page: newPage });
    }, [loadShifts]);

    // Initial data loading
    useEffect(() => {
        loadShiftsRef.current = loadShifts;
        if (loadShiftsRef.current) {
            loadShiftsRef.current();
        }
    }, [loadShifts]);

    /**
     * Create a new shift
     */
    const createShift = useCallback(async (formData) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await shiftSlice.getState().createNewShift(formData);
            await loadShifts();
            return response;
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false, error: error.message }));
            throw error;
        }
    }, [loadShifts]);

    /**
     * Update an existing shift
     */
    const updateShift = useCallback(async (shiftId, formData) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await shiftSlice.getState().updateShift(shiftId, formData);
            await loadShifts();
            return response;
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false, error: error.message }));
            throw error;
        }
    }, [loadShifts]);

    /**
     * Delete a shift
     */
    const deleteShift = useCallback(async (shiftId) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await shiftSlice.getState().deleteShift(shiftId);
            await loadShifts();
            return response;
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false, error: error.message }));
            throw error;
        }
    }, [loadShifts]);

    const contextValue = useMemo(() => ({
        ...state,
        loadShifts,
        setPage,
        createShift,
        deleteShift,
        updateShift
    }), [state, loadShifts, setPage, createShift, deleteShift, updateShift]);

    return (
        <ShiftContext.Provider value={contextValue}>
            {children}
        </ShiftContext.Provider>
    );
};

export const useShiftContext = () => {
    const context = useContext(ShiftContext);
    if (!context) throw new Error('useShiftContext must be used within a ShiftProvider');
    return context;
};
