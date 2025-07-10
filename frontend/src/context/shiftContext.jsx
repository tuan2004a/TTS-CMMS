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
    const fetchShiftsRef = useRef(null);

    const LoadShifts = useCallback(async ({ p = state.currentPage, l = state.limit } = {}) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await shiftSlice.getState().fetchShifts({ page: p, limit: l });
            const {
                hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter,
                prevPage, result, totalDocs, totalPages
            } = response;

            setState(prev => ({
                ...prev,
                shifts: response,
                pagination: {
                    hasNextPage, hasPrevPage, limit, nextPage, page,
                    pagingCounter, prevPage, result, totalDocs, totalPages
                },
                currentPage: page,
                limit,
                isLoading: false,
                error: null,
            }));

            // console.log(response);
            return response;
        } catch (error) {
            setState(prev => ({
                ...prev,
                shifts: [],
                isLoading: false,
                error,
            }));
        }
    }, [state.currentPage, state.limit]);

    const setPage = useCallback(async (newPage) => {
        setState(prev => ({ ...prev, currentPage: newPage }));
        await LoadShifts({ p: newPage, l: state.limit });
    }, [LoadShifts, state.limit]);

    useEffect(() => {
        fetchShiftsRef.current = LoadShifts;
        if (fetchShiftsRef.current) {
            fetchShiftsRef.current();
        }
    }, [LoadShifts]);

    const createShift = useCallback(async (formData) => {
        try {
            const response = await shiftSlice.getState().createNewShift(formData);
            console.log('Tạo thành công');
            await LoadShifts(); // cập nhật lại danh sách sau khi thêm
            return response;
        } catch (error) {
            console.error(error);
            throw new Error("Error creating shift");
        }
    }, [LoadShifts]);

    const deleteShift = useCallback(async (shiftId) => {
        try {
            const response = await shiftSlice.getState().deleteShift(shiftId);
            await LoadShifts(); // cập nhật lại danh sách sau khi xóa
            return response;
        } catch (error) {
            console.error(error);
            throw new Error("Error deleting shift");
        }
    }, [LoadShifts]);

    const contextValue = useMemo(() => ({
        ...state,
        LoadShifts,
        setPage,
        createShift,
        deleteShift,
    }), [state, LoadShifts, setPage, createShift, deleteShift]);

    return (
        <ShiftContext.Provider value={contextValue}>
            {children}
        </ShiftContext.Provider>
    );
};

export const useShiftContext = () => {
    const context = useContext(ShiftContext);
    // console.log('ShiftContext:', context);
    if (!context) throw new Error('useShiftContext must be used within a ShiftProvider');
    return context;
};
